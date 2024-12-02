import { getDevEnv } from "./dev.js";

const envFactory = {
    development: getDevEnv,
};

export const env = envFactory[process.env.NODE_ENV]();
