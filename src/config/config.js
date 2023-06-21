import { config } from 'dotenv';

config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

export const  {
    PORT,
    API_VERSION,
    NODE_ENV,
    ORIGIN,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_CNN,
} = process.env;