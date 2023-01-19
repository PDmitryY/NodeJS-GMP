import * as sqlite from 'sqlite3';
import util from 'util'

const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database(':memory:')

const promisifyRun = util.promisify(db.run.bind(db));

export async function initDb () {
  await promisifyRun(`CREATE TABLE users (
    id TEXT PRIMARY KEY,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    age INTEGER NOT NULL,
    isDeleted BOOLEAN NOT NULL
  );`
  )
}

export default db;