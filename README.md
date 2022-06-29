# Sistema de Autenticação JWT

Sistema de login usando a biblioteca jsonwebtoken para criar o token para as rotas privadas
## Instalação

Para rodar o projeto e instalar é preciso ter o Node instalado e rodar os seguintes comandos:

```bash
  npm install
  npm run start
```


## Documentação da API

#### Retorna padrão para testar se o servidor está funcionando
 
```http
  GET http://localhost:3500
```

#### Retorna um usuário selecionado por 'id', rota protegida
 
```http
  GET http://localhost:3500/user/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. O ID do usuário |

#### Retorna os dados de um usuário como no exemplo abaixo:

```http
  {
    "user": {
        "_id": "62bbc0495aabeb98908d253f",
        "name": "Ana",
        "email": "ana@gmail.com",
        "__v": 0
    }
}
```

#### Retorna registra um usuário no banco de dados 
 
```http
  GET http://localhost:3500/auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. O nome do usuário |
| `email`| `string` | **Obrigatório**. O e-mail do usuário|
| `password`| `string` | **Obrigatório**. A Senha do usuário|
| `confirmpassword`| `string` | **Obrigatório**. A confirmação de senha do usuário|

#### Retorna um json com status 201 como no exemplo abaixo:

```http
{
    "msg": "Usuário criado com sucesso!"
}
```

#### Rota para realizar o login do usuário e criar o token
 
```http
  GET http://localhost:3500/auth/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email`| `string` | **Obrigatório**. O e-mail do usuário|
| `password`| `string` | **Obrigatório**. A Senha do usuário|

#### Retorna um json com status 200 e com token gerado, como no exemplo abaixo:

```http
{
    "msg": "Autenticação realizada com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmI1ZDE3ZjkwNDBkMjNlNTE3YmQ2YSIsImlhdCI6MTY1NjQ3NTAyMn0.hjoe8HBB5mNTAugbkqjLYK50bLdzY9QyRB62Ph12wh0"
}
```

## Stack utilizada

**Back-end:** Node, Express, JsonWebToken, Dotenv, Mongoose, Bcrypt

## Licença

[MIT](https://choosealicense.com/licenses/mit/)