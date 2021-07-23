
import supertest from "supertest";

import app from "../../src/app";
import { createSong }  from "../factories/songsFactory";
import connection from '../../src/database'

beforeEach( () => {
  connection.query(`TRUNCATE songs RESTART IDENTITY CASCADE`)
})

afterAll( () => {
  connection.query(`TRUNCATE songs RESTART IDENTITY CASCADE`)
  connection.end();
})

describe('POST /recommendations', () =>{
  it('should answer status 201 for valid params', async () => {
    const song = await createSong();

    const response = await supertest(app).post('/recommendations').send(song);

    expect(response.status).toEqual(201);
  })

  it('should answer status 400 for invalid name', async () => {
    const song = await createSong();
    const body ={ name: 2345, youtubeLink: song.youtubeLink};

    const response = await supertest(app).post('/recommendations').send(body);
  
    expect(response.status).toEqual(400);
  })

  it('should answer status 400 for invalid youtubeLink ', async () => {
    const song = await createSong();
    const body ={ name: song.name, youtubeLink: 'https://www.globo.com' };
    
    const response = await supertest(app).post('/recommendations').send(body);

    expect(response.status).toEqual(400);
  })

  it('should answer status 401 for duplicated song ', async () => {
    const song = await createSong();
    
    await supertest(app).post('/recommendations').send(song)
    const response = await supertest(app).post('/recommendations').send(song);

    expect(response.status).toEqual(401);
  })
})

describe('POST /recommendations/:id/upvote', () =>{
  it('should answer status 200 for score updated', async () => {
    //
  })

})