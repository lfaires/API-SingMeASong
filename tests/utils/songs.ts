import '../../src/setup'
import supertest from "supertest";

import app from "../../src/app";
import { createSong } from '../factories/songsFactory';

export async function createRecommendedSong(){
    const song = await createSong();
    await supertest(app).post('/recommendations').send(song);

    return song;
}