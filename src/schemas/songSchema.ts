import joi from 'joi';

const songSchema = joi.object({
    name: joi.string().min(3).required(),
    youtubeLink: joi.string().pattern(new RegExp(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)).required(),
});

export { songSchema };
