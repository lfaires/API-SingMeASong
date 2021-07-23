import connection from "../database";

export async function saveSong(name: string, link: string) {

    const result = await connection.query(`
        INSERT INTO songs (name, "youtubeLink") 
        VALUES ($1, $2) RETURNING *`,[name, link])
  
    return result.rows[0];
}

export async function findByLink(link: string) {
    
    const result = await connection.query(`
        SELECT * FROM songs WHERE "youtubeLink" = $1`,[link])
        
    return result.rows[0];
}