import { Request, Response } from "express";
import { songSchema } from '../schemas/songSchema'
import * as songsService from '../services/songsService'
import * as songsRepository from '../repositories/songsRepository'

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
        if(isNaN(validateId) || validateId < 0) return res.sendStatus(400)

        const song = await songsService.updateScoreUp(id);

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
    try{
        const { id } = req.params

        const validateId = parseInt(id)
        if(isNaN(validateId) || validateId < 0) return res.sendStatus(400)

        const song = await songsService.updateScoreDown(id);

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

export async function getTop(req: Request,res: Response){
    try{
        const { amount } = req.params
        
        const validateAmount = parseInt(amount)
        if(isNaN(validateAmount) || validateAmount < 0) return res.sendStatus(400)

        const songs = await songsRepository.getTopByAmount(amount)

        if (songs) {
            res.send(songs);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}