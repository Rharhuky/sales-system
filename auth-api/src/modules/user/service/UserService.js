import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js"
import UserException from "../exception/UserException.js";
class UserService {

    async findByEmail(req) {

        try {
            const { email } = req.params;
            this.validateRequest(email);
            let theUser = await UserRepository.findByEmail(email);
            this.validateUserNotFound(theUser);

            if (!this.userExists(theUser)) {
                throw new Error('User not found');
            }
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
            }
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

    userExists(user) {
        return user;
    }

}
export default new UserService();
