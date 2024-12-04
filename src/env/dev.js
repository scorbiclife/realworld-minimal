import { config } from "dotenv";
import path from "path";

config({ path: path.join(import.meta.dirname, ".env.development") });

export function getDevEnv() {
    const { host, user, password, database } = process.env;
    const port = process.env.DB_PORT ?? 3306;
    return {
        host,
        port,
        user,
        password,
        database,
    };
}
