// db.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, "../db/response-faker.db");
const db = new Database(dbPath);


export default db;
