# Transfer APP

<p align="center">Aplicação de transferências entre contas</p>

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [JsonWebToken](https://jwt.io/)

<p>Optei por utilizar Typescript como linguagem de programação, com o auxílio de frameworks como o Express para criar a API. Postgres como banco de dados relacional e JsonWebToken como maneira de autenticação.</p>

### Descrição

<p>A aplicação funciona da seguinte maneira: O usuário faz o login como admin (é possível se cadastrar também), após isso é gerado um token de autenticação armazenado no Storage do navegador. No script, é feita uma verificação do token onde só é possível seguir para a página de transações se o token for válido.</p>
<p> Na página de transações, o usuário irá informar o número da conta do emissor, do receptor (informações dos campos estará no final do readme para utilizar a aplicação), o valor e o tipo da transferência.
<p> Além disso, as transações seguem algumas regras de valores próprios para PIX, TED ou DOC.
  

### Como utilizar a aplicação?
  
<p>Realizei o deploy da aplicação, que pode ser acessada em: <b>https://extraordinary-gumption-bf4f38.netlify.app</b>
<p>A primeira tela será a de login, onde pode acessar a aplicação usando uma conta de admin.
  

<h1> Dados das tabelas já populadas </h1>
  
<p>Informações auxiliares no uso correto da aplicação:

<h2>Tabela "admins"</h2>
<p>Use para fazer login na aplicação, mas é possível se cadastrar também clicando em "register"</p>
<table border="1">
    <tr>
        <td>id</td>
        <td>name</td>
        <td>username</td>
        <td>password</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Admin1</td>
        <td>admin1</td>
        <td>Senha@123</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Admin2</td>
        <td>admin2</td>
        <td>Senha@123</td>
    </tr>
</table>

<h2>Tabela "holders"</h2>
<p>Lista de titulares das contas</p>
<table border="1">
    <tr>
        <td>id</td>
        <td>name</td>
        <td>email</td>
        <td>cpf</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Lucas</td>
        <td>lucas@email.com</td>
        <td>1653133180</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Marcos</td>
        <td>marcos@email.com</td>
        <td>69179264000</td>
    </tr>
   <tr>
        <td>3</td>
        <td>Júlia</td>
        <td>julia@email.com</td>
        <td>29964915055</td>
    </tr>
   <tr>
        <td>4</td>
        <td>Lorenna</td>
        <td>lorenna@email.com</td>
        <td>4314900504</td>
    </tr>
   <tr>
        <td>5</td>
        <td>Hugo</td>
        <td>hugo@email.com</td>
        <td>39934373068</td>
    </tr>
</table>


<h2>Tabela "accounts"</h2>
<p>Lista de contas, use o número da conta pra usar na aplicação</p>
<table border="1">
    <tr>
        <td>id</td>
        <td>numberAccount</td>
        <td>balance</td>
        <td>holderId</td>
    </tr>
    <tr>
        <td>1</td>
        <td>26754-2</td>
        <td>0</td>
        <td>1</td>
    </tr>
    <tr>
        <td>2</td>
        <td>12345-2</td>
        <td>0</td>
        <td>1</td>
    </tr>
   <tr>
        <td>3</td>
        <td>54321-2</td>
        <td>0</td>
        <td>2</td>
    </tr>
   <tr>
        <td>4</td>
        <td>32322-2</td>
        <td>0</td>
        <td>3</td>
    </tr>
   <tr>
        <td>5</td>
        <td>16532-2</td>
        <td>0</td>
        <td>4</td>
    </tr>
   <tr>
        <td>6</td>
        <td>54789-2</td>
        <td>0</td>
        <td>5</td>
    </tr>
</table>

<h2>Tabela "transactions"</h2>
<p>Lista de transações, assim que uma transação ser criada, irá popular essa tabela com as seguintes informações:</p>
<table border="1">
    <tr>
        <td>id</td>
        <td>type</td>
        <td>amount</td>
        <td>senderAccountId</td>
        <td>receiverAccountId</td>
    </tr>
 </table>



