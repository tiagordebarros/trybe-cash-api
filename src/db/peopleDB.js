const camelize = require('camelize');
const connection = require('./connection');

const insert = async (person) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO people 
      (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,
      [person.firstName, person.lastName, person.email, person.phone],
  );
  return [{insertId}];
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM people',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM people WHERE id = ?',
    [id],
  );
  return result;
};

const update = async (person, id) => {
  const [result] = await connection.execute(
    `UPDATE people 
    SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?`,
    [person.firstName, person.lastName, person.email, person.phone, id],
  );
  return [result];
};

module.exports = {
  insert,
  findAll,
  findById,
  update,
};
