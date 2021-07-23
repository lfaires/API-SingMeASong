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