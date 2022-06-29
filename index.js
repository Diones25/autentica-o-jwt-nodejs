import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import checkToken from './middlewares/checkToken.js'

dotenv.config();

const port = 3500;
const app = express();
app.use(express.json());

//Models
import User from './models/User.js';

app.get("/", (req,res) => {
    res.status(200).json({ msg: "Bem vindo a nossa API!" });
});

app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id, '-password')  

    if(!user) { 
        return res.status(404).json({ msg: "Usuário não encontrado!" })
    }

    res.status(200).json({ user });
});

app.post("/auth/register", async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    //validações
    if(!name) {
        return res.status(422).json({ msg: " O nome é obrigatório!" });
    }
    if(!email) {
        return res.status(422).json({ msg: " O email é obrigatório!" });
    }
    if(!password) {
        return res.status(422).json({ msg: " A senha é obrigatória!" });
    }
    if(password !== confirmpassword) {
        return res.status(422).json({ msg: " As senhas não conferem" });
    }

    //Verificando se o usuário existe
    const userExists = await User.findOne({ email: email });

    if(userExists) {
        return res.status(422).json({ msg: " Por favor utilize outro e-mail" });
    }

    //criando senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Criando usuário
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {

        await user.save();
        res.status(201).json({ msg: "Usuário criado com sucesso!" })

    }catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" })
    }
})

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    //validações
    if(!email) {
        return res.status(422).json({ msg: " O email é obrigatório!" });
    }
    if(!password) {
        return res.status(422).json({ msg: " A senha é obrigatória!" });
    } 

    //Verificando se o usuário existe
    const user = await User.findOne({ email: email });

    if(!user) {
        return res.status(422).json({ msg: "Usuário não encontrado!" });
    }

    //verificando se as senhas batem
    const checkpassword = await bcrypt.compare(password, user.password);
    if(!checkpassword) {
        return res.status(404).json({ msg: "Senha não encontrada!" });
    }

    try{

        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )

        res.status(200).json({ msg: "Autenticação realizada com sucesso", token });

    }catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" })
    }
})

mongoose.connect(
    `mongodb://localhost:27017/authjwt`
).then(
    console.log("Conectado ao MongoDB!"),
    app.listen(port, () => {
        console.log(`Servidor rodando no endereço: http://localhost:${port}`)
    })

).catch((err) => {
    console.log(err)
}); 
