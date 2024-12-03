import { pool, getConnection } from "./data-access/connection.js";

const connection = await getConnection();
const [rows] = await connection.execute("select * from user");
rows;

await pool.end();