import dotenv from 'dotenv';

const envfile: string = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: envfile });