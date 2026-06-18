import type { RequestHandler } from "express";
import {ACCESS_JWT_SECRET} from "#config"
import jwt from "jsonwebtoken"

const authenticate: RequestHandler = (req, res, next) => {

    try {
        // Get the access token from the request headers
        // Get the Authorization header from the request
        const authHeader = req.header('authorization');
        // Isolate the access token
        const accessToken = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1];
        // Throw an error if there is not access token
        if (!accessToken) {
      res.status(401).json({ message: 'Access token is required.' });
      return;
    }
    // Verify the access token
    const decoded = jwt.verify(accessToken, ACCESS_JWT_SECRET) as jwt.JwtPayload;
    //Add the user's id and roles as a user property of the request object
    req.user = {id: decoded.sub, roles : decoded.roles}
    //Call next() 
    next()
  } catch (error) {
      // If token is expired, add code: ACCESS_TOKEN_EXPIRED to error
      
      if (error instanceof jwt.TokenExpiredError) {
          next(
              new Error('Expired access token', {
                  cause: { status: 401, code: 'ACCESS_TOKEN_EXPIRED' }
                })
            );
        } else {
            next(new Error('Invalid access token.', { cause: { status: 401 } }));
        }
    }
}

export default authenticate