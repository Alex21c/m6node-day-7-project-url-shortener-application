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
// console.log(UrlShortenerController)

const UrlShortenerRoutes = express.Router();

UrlShortenerRoutes.post('/api/v1/short-url', UrlShortenerController.shortUrl);

// additional APIs requests handling
UrlShortenerRoutes.get('/:shortedURI', UrlShortenerController.redirectUser);



export default UrlShortenerRoutes;