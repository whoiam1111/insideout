import pkg from 'pg';
const { Client } = pkg;

export function getClient() {
    return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
}
