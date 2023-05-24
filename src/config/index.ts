import { config } from 'dotenv';
config({ path: `./src/env/.env.${process.env.NODE_ENV || 'development'}.local` });

export const envObjects = process.env;
