import * as songsRepository from '../repositories/songsRepository'

export async function checkForDuplicatedSong(name: string, link: string){
    const duplicatedSong = await songsRepository.findByLink(link);
   
    if (duplicatedSong) {
        return null;
    }
    
    const song = await songsRepository.saveSong(name, link); 
    
    return song;
}