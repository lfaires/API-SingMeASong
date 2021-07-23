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

export async function findById(id: string) {
    
    const result = await connection.query(`
        SELECT * FROM songs WHERE id = $1`,[id])
        
    return result.rows[0];
}

export async function scoreUp(id: string) {
    
    const result = await connection.query(`
        UPDATE songs SET score = score + 1 WHERE id = $1 RETURNING *`,[id])
        
    return result.rows[0];
}

export async function scoreDown(id: string) {
    
    const result = await connection.query(`
        UPDATE songs SET score = score - 1 WHERE id = $1 RETURNING *`,[id]);
        
    return result.rows[0];
}

export async function deleteRecommended(id: string) {
    
    const score: number = -5;
    const result = await connection.query(`
        DELETE FROM songs WHERE score < $1`,[score]);

}

export async function getTopByAmount(amount: string) {

    const result = await connection.query(`
        SELECT * FROM songs ORDER BY score DESC LIMIT $1`,[amount])
    
        return result.rows.length === 0 ? false : result.rows;
}