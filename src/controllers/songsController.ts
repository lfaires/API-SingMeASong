import { Request, Response } from "express";
import { songSchema } from '../schemas/songSchema'
import * as songsServices from '../services/songsServices'

export async function recommend(req: Request,res: Response){
    try {
        const validation = songSchema.validate(req.body).error;
        if(validation) return res.sendStatus(400);

        const { name, youtubeLink } = req.body;

        const song = await songsServices.checkForDuplicatedSong(name, youtubeLink); 
        
        if (song) {
            res.sendStatus(201);
        } else {
            res.sendStatus(401);
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function scoreUp(req: Request,res: Response){
    const { id } = req.params

    //pegar o id
    //checkar se tem musica com esse id
    //aumentar 1 ponto no score
}

export async function scoreDown(req: Request,res: Response){
    const { id } = req.params
}