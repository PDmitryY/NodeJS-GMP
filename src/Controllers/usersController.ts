import { Request, Response } from 'express';
import db from './../db';
import validationErrors from './../validationResult';

export const getUserById = async (req: Request, res: Response) => {
  validationErrors(req, res);
  try {
    const id = req.params.id;
    const limit = req.query.limit;
    const page = req.query.page;
    db.all(`SELECT * FROM users WHERE id=? LIMIT ? OFFSET ?`, [id, limit, page], (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).json({rows});
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  validationErrors(req, res);
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    db.all(`SELECT email FROM users WHERE LIMIT ? OFFSET ?`, [limit, page], (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).json({rows});
    });
  } catch (e) {
    res.status(500).json(e);
  }
};