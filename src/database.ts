import pg from 'pg';

const { Pool } = pg;

const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: 'postgres',
    password: '123456',
    database: 'recommended_songs_test',
}

const connection = new Pool(config);

export default connection;