import mysql from 'mysql2';
import options from './keys';

export const pool = mysql.createPool(options);

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log('conexión establecido con éxito');
    connection.release();
  }
});

export default pool;
