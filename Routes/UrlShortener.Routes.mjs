/**
 * 
 * ROUTES for short URL?
 * POST /api/v1/short-url
 * this will take data from user via form.
 * {
 * destinationURL: say https://github.com/Alex21c
 * customBackHalf: (optional) say alex21cGitHub
 * }
 * 
 * GET /:shortURL
 * this will redirect user to destination url
 * 
 */

import express from 'express';
import UrlShortenerController from '../Controllers/UrlShortener.Controller.mjs';
import inputValidationUrlShortener from '../Middlewares/InputValidationUrlShortener.Middleware.mjs';
import AuthenticateUser from '../Middlewares/AuthenticateUser.Middleware.mjs';
// console.log(UrlShortenerController)

const UrlShortenerRoutes = express.Router();

UrlShortenerRoutes.post('/short-url', AuthenticateUser, inputValidationUrlShortener, UrlShortenerController.shortUrl);
UrlShortenerRoutes.post('/get-all-urls-created-by-current-user', AuthenticateUser, UrlShortenerController.getAllUrlsCreatedByCurrentUser);
UrlShortenerRoutes.post('/delete-a-document-created-by-this-current-user', AuthenticateUser, UrlShortenerController.deleteADocumentCreatedByThisCurrentUser);

// additional APIs requests handling
UrlShortenerRoutes.get('/:shortedURI', UrlShortenerController.redirectUser);



export default UrlShortenerRoutes;