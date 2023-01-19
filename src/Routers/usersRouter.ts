import { Router } from "express";
import { param, query } from 'express-validator';
import { getAllUsers, getUserById } from "./../Controllers/usersController";

const usersRouter = Router();

usersRouter.get('/:id', 
  param('id').isString(),
  query('limit').isNumeric(),
  query('page').isNumeric(),
  getUserById);

usersRouter.get('/', 
  query('limit').isNumeric(),
  query('page').isNumeric(),
  getAllUsers);

export default usersRouter;