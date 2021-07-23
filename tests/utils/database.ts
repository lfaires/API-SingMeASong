import connection from '../../src/database'

export async function clearDatabase(){
    await connection.query(`TRUNCATE songs RESTART IDENTITY CASCADE`)
}