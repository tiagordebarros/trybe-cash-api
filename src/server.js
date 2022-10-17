const app = require("./app");
const connection = require("./db/connection");

const port = 3001;

app.listen(port, async () => {
  console.log(`Bem vindo, ${process.env.USER}.`);
  console.log(`API TrybeCash está sendo executada na porta ${port}.`);

  const [result] = await connection.execute(
    'SELECT * FROM trybecashdb.people'
  );
  
  if (result) return console.log('Conexão com o banco de dados estabelecida com sucesso!');
});
