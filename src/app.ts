import express from 'express';
import cors from 'cors';

import * as songsController from './controllers/songsController'

const app = express();

app.use(cors());
app.use(express.json());

app.post('/recommendations', songsController.recommend)
app.post('/recommendations/:id/upvote', songsController.scoreUp)
app.post('/recommendations/:id/downvote', songsController.scoreDown)

export default app;