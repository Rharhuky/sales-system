/**
 * before of each request
 */

import jwt from "jsonwebtoken";
import { promisify } from "util";
import * as secrets from "../constants/secrets.js";
import * as httpStatus from "../constants/httpStatus.js";
import AuthException from "./AuthException.js";

const bearer = "Bearer ";

export default async (req, res, next) => {

    try {
        const { authorization } = req.headers;
        if (thereIsNotAuthorizationHeader(authorization)) {
            throw new AuthException(httpStatus.UNAUTHORIZED, "Access Token was not sent!");
        }

        let accessToken = authorization;
        if (accessToken.includes(bearer)) {
            accessToken = accessToken.replace(bearer, "");
        } else {
            accessToken = authorization;
        }
        const decoded = await promisify(jwt.verify)(accessToken, secrets.API_SECRET);
        req.authUser = decoded.authUser;
        return next();
    } catch (err) {
        const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
            status,
            message: "Invalid Token!",
        });
    }


};

const thereIsNotAuthorizationHeader = (authorization) => {
    return !authorization;
}