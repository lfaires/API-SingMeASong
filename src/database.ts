import pg from 'pg';

const { Pool } = pg;

const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

const connection = new Pool(config);

export default connection;