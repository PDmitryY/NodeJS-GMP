import { Request, Response } from 'express';
import db from './../db';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const id = uuidv4();
    console.log("id", id);
    const login = req.body.login;
    const password = req.body.password;
    const age = req.body.age;
    const isDeleted = false;
    db.run(`INSERT INTO users(id, login, password, age, isDeleted) VALUES(?, ?, ?, ?, ?)`, [id, login, password, age, isDeleted], function(err) {
      if (err) {
        throw err;
      }
      res.status(200).json({insertedId: this.lastID});
    });
  } catch (e) {
    res.status(500).json(e);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const isDeleted = true;
    db.run(`UPDATE users SET isDeleted = ? WHERE id = ?`, [isDeleted, id], function(err) {
      if (err) {
        throw err;
      }
      res.status(200).json({updated: this.lastID});
    });
  } catch (e) {
    res.status(500).json(e);
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const login = req.body.login;
    const password = req.body.password;
    const age = req.body.age;
    const isDeleted = false;
    db.run(`UPDATE users SET login = ? password = ? age = ? isDeleted = ? WHERE id = ?`, 
      [login, password, age, isDeleted, id], function(err) {
        if (err) {
          throw err;
        }
        res.status(200).json({updated: this.lastID});
    });
  } catch (e) {
    res.status(500).json(e);
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    db.all(`SELECT login FROM users WHERE id=?`, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ rows });
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getAutoSuggestUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    let offset = limit * (page - 1);
    const loginSubstring = req.query.loginSubstring;
    console.log("getAll req.query", req.query);
    db.all(`SELECT * FROM users WHERE isDeleted=0 AND login LIKE '%${loginSubstring}%' ORDER BY login LIMIT ${limit} OFFSET ${offset}`, (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ rows });
    });
  } catch (e) {
    res.status(500).json(e);
  }
};