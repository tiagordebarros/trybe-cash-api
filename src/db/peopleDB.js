const connection = require('./connection');

const insert = async (person) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO people 
      (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,
      [person.firstName, person.lastName, person.email, person.phone],
  );
  return [{insertId}];
};

module.exports = insert;
