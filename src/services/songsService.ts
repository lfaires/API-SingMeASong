import * as songsRepository from '../repositories/songsRepository'

export async function checkForDuplicated(name: string, link: string){
    const duplicatedSong = await songsRepository.findByLink(link);
   
    if (duplicatedSong) {
        return false;
    }
    
    const song = await songsRepository.saveSong(name, link); 
    
    return song;
}

export async function checkAndUpdate(id: string){
    const song = await songsRepository.findById(id);
   
    if (!song) {
        return false;
    }
    
    const updated = await songsRepository.updateScore(id); 
    
    return updated;
}