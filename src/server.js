const app = require("./app");
const connection = require("./db/connection");

const port = 3001;

app.listen(port, async () => {
  console.log(`API TrybeCash está sendo executada na porta ${port}.`);

  const [result] = await connection.execute(
    'SELECT * FROM trybecashdb.people'
  );

  if (result) {
    console.log('Conexão MYSQL estabelecida com sucesso!');
  } else {
    console.log('Falha na conexão ao banco de dados MYSQL');
  }
});
