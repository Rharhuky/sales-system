import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js"
import UserException from "../exception/UserException.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import * as secrets from "../../../config/constants/secrets.js";


class UserService {

    async findByEmail(req) {

        try {
            const { email } = req.params;
            this.validateRequest(email);
            let theUser = await UserRepository.findByEmail(email);
            this.validateUserNotFound(theUser);

            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: theUser.id,
                    name: theUser.name,
                    email: theUser.email
                }
            }

        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.status,
            };
        }
    }

    validateRequest(email) {
        if (!email) {
            throw new UserException(httpStatus.BAD_REQUEST("Email not informed !"));
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new Error(httpStatus.BAD_REQUEST, "User not found.")
        }

    }

    async getAccessToken(req) {
        try {
            const { email, password } = req.body;
            this.validateAccessTokenData(email, password);
            let theUser = await UserRepository.findByEmail(email);
            this.validateUserNotFound(theUser);
            await this.validateUserPassword(password, theUser.password);
            let authUser = { // authenticated user object
                id: theUser.id,
                name: theUser.name,
                email: theUser.email
            };
            const accessToken = jwt.sign({ authUser }, secrets.API_SECRET, { expiresIn: "1d" });
            return {
                status: httpStatus.SUCCESS,
                accessToken,
            }
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.status,
            };
        }

    }

    validateAccessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Error with email or passoword :/");
        }
    }

    async validateUserPassword(pass, hashPass) {
        if (!await bcrypt.compare(pass, hashPass)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match.")
        }
    }

}
export default new UserService();
