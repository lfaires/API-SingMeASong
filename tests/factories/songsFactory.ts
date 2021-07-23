import faker from 'faker';

export async function createSong(){
    const song = {
        name: faker.name.findName(),
        youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }

    return song
}