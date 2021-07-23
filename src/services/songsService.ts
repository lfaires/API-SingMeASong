import { resourceLimits } from 'worker_threads';
import * as songsRepository from '../repositories/songsRepository'

export async function checkForDuplicated(name: string, link: string){
    const duplicatedSong = await songsRepository.findByLink(link);
   
    if (duplicatedSong) {
        return false;
    }
    
    const song = await songsRepository.saveSong(name, link); 
    
    return song;
}

export async function updateScoreUp(id: string){
    const checkIfExists= await songsRepository.findById(id);
   
    if (!checkIfExists) {
        return false;
    }
    
    const update = await songsRepository.scoreUp(id); 
    
    return update;
}

export async function updateScoreDown(id: string){
    const checkIfExists = await songsRepository.findById(id);
   
    if (!checkIfExists) {
        return false;
    }
    
    const update = await songsRepository.scoreDown(id); 
    await songsRepository.deleteRecommended(id);

    return update;
}

export async function getSong(){
    let songs: {}[] | false = []
    const probability = Math.ceil(Math.random()*100)

    if (probability <= 30) {
        songs = await songsRepository.getLowScore()
    } else {
        songs = await songsRepository.getHighScore()
    }
    
    if(!songs){
        songs = await songsRepository.getAny()
    }

    if (!songs) return false
    
    const numberOfSongs = songs.length
    const songIndex = getRandomIndex(0,numberOfSongs-1)
    const song = songs.filter( (item,i) => i === songIndex)

    return song
}

function getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}