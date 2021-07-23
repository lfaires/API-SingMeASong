import { Request, Response } from "express";
import { songSchema } from '../schemas/songSchema'
import * as songsService from '../services/songsService'

export async function recommend(req: Request,res: Response){
    try {
        const validation = songSchema.validate(req.body).error;
        if(validation) return res.sendStatus(400);

        const { name, youtubeLink } = req.body;

        const song = await songsService.checkForDuplicated(name, youtubeLink); 
        
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
    try{
        const { id } = req.params

        const validateId = parseInt(id)
        if(isNaN(validateId) || validateId < 1) return res.sendStatus(400)

        const song = await songsService.checkAndUpdate(id);

        if (song) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }


}

export async function scoreDown(req: Request,res: Response){
    const { id } = req.params
}