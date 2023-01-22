import { Router } from "express";
import { body, param, query } from "express-validator";
import { createUser, deleteUser, getAutoSuggestUser, getUserById, updateUser } from "./../Controllers/usersController";

const usersRouter = Router();

usersRouter.post('/', 
  body('login').notEmpty().isString(),
  body('password').notEmpty().isStrongPassword(),
  body('age').notEmpty().isInt({ min: 10, max: 99 }),
  createUser);

usersRouter.patch('/delete/:id', 
  param('id').notEmpty().isString(),
  deleteUser);

usersRouter.patch('/update/:id', 
  param('id').notEmpty().isString(),
  body('login').notEmpty().isString(),
  body('password').notEmpty().isStrongPassword(),
  body('age').notEmpty().isInt({ min: 10, max: 99 }),
  updateUser);

usersRouter.get('/:id', 
  param('id').notEmpty().isString(),
  getUserById);

usersRouter.get('/', 
  query('limit').isNumeric(),
  query('page').isNumeric(),
  query('loginSubstring').notEmpty().isString(),
  getAutoSuggestUser);

export default usersRouter;