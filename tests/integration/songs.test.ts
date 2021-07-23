
import '../../src/setup'
import supertest from "supertest";

import app from "../../src/app";
import { createSong }  from "../factories/songsFactory";
import connection from '../../src/database'

const agent = supertest(app);

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

    const response = await agent.post('/recommendations').send(song);

    expect(response.status).toEqual(201);
  })

  it('should answer status 400 for invalid name', async () => {
    const song = await createSong();
    const body ={ name: 2345, youtubeLink: song.youtubeLink};

    const response = await agent.post('/recommendations').send(body);
  
    expect(response.status).toEqual(400);
  })

  it('should answer status 400 for invalid youtubeLink ', async () => {
    const song = await createSong();
    const body ={ name: song.name, youtubeLink: 'https://www.globo.com' };
    
    const response = await agent.post('/recommendations').send(body);

    expect(response.status).toEqual(400);
  })

  it('should answer status 401 for duplicated song ', async () => {
    const song = await createSong();
    
    await agent.post('/recommendations').send(song)
    const response = await agent.post('/recommendations').send(song);

    expect(response.status).toEqual(401);
  })
})

describe('POST /recommendations/:id/upvote', () =>{
  it('should answer status 200 for score updated', async () => {
    const song = await createSong();
    await agent.post('/recommendations').send(song);

    const response = await agent.post('/recommendations/1/upvote').send(song);

    expect(response.status).toEqual(200);
  })

  it('should answer status 404 for valid id that does not exist', async () => {
    const song = await createSong();
    await agent.post('/recommendations').send(song);

    const response = await agent.post('/recommendations/3/upvote').send(song);

    expect(response.status).toEqual(404);
  })

  it('should answer status 400 for invalid id', async () => {
    const song = await createSong();
    await agent.post('/recommendations').send(song);

    const response = await agent.post('/recommendations/ronald/upvote').send(song);

    expect(response.status).toEqual(400);
  })

})

describe('POST /recommendations/:id/downvote', () =>{
  it('should answer status 200 for score updated', async () => {
    const song = await createSong();
    await agent.post('/recommendations').send(song);

    const response = await agent.post('/recommendations/1/downvote').send(song);

    expect(response.status).toEqual(200);
  })

  it('should answer status 404 for valid id that does not exist', async () => {
    const song = await createSong();
    await agent.post('/recommendations').send(song);

    const response = await agent.post('/recommendations/3/downvote').send(song);

    expect(response.status).toEqual(404);
  })

  it('should answer status 400 for invalid id', async () => {
    const song = await createSong();
    await agent.post('/recommendations').send(song);

    const response = await agent.post('/recommendations/ronald/downvote').send(song);

    expect(response.status).toEqual(400);
  })

})