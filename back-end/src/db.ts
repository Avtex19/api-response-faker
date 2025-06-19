import Database from 'better-sqlite3';
import * as path from "node:path";


const dbPath = path.resolve('./db/response-faker.db');
const db = new Database(dbPath);

export default db;
