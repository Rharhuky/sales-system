import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js"

class UserService {

    async findByEmail(req) {

        try {
            const { email } = req.params;
            this.validateRequest(email);
            let theUser = UserRepository.findByEmail(email)

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
            throw new Error('Email not informed !');
        }
    }

    userExists(user) {
        return user;
    }

}
export default new UserService();
