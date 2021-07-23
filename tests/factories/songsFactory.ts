import faker from 'faker';

export async function createSong(){
    const song = {
        name: 'Cante por nós',
        youtubeLink: 'https://www.youtube.com/watch?v=ldU21DyOkl0'
    }

    return song
}