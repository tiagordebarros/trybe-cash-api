require('dotenv').config();
const app = require("./app");
const connection = require("./db/connection");

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Bem vindo, ${process.env.USER_NAME}.`);
  console.log(`TrybeCash API está sendo executado na porta ${port}.`);

  const [result] = await connection.execute('SELECT 1');
  
  if (result) return console.log('Conexão com o banco de dados estabelecida com sucesso!');
});
