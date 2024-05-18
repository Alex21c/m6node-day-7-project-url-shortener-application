/**
 * ROUTES for User
 * POST /api/v1/sign-up
 * takes data using html form from user
 * {
 * email: String email address of user
 * password: String Hashed password for sign-in
 * firstName : String first name of user
 * lastName : String last name of user
 * }
 * 
 * POST /api/v1/sign-in
 * validate user by taking email and password 
 * {
 * email: String email address of user
 * password: String Hashed password for sign-in
 * }
 */
import express from 'express';
import UserController from '../Controllers/Users.Controller.mjs';


const UserRoutes = express.Router();

UserRoutes.post('/api/v1/user/sign-up', UserController.signUpUser);

UserRoutes.post('/api/v1/user/sign-in', UserController.signInUser);

export default UserRoutes;