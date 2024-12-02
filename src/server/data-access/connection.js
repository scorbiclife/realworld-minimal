import { createPool } from "mysql2/promise";
import { env } from "../../env/index.js";

const { host, port, user, password, database } = env;

const pool = await createPool({
    host,
    port,
    user,
    password,
    database,
});

export async function getConnection() {
    return pool.getConnection();
}
