import User from "../model/User.js"

class UserRepository {

    async findById(id) {
        try {
            console.info(`Obtains user with id:${id}`)
            return await User.findOne({ where: { id } })
        } catch (err) {
            console.error(err.message);
            return null
        }
    }


    async findByEmail(email) {
        try {
            console.info(`Obtaisns user with email: ${email}`)
            return await User.findOne({ where: { email } })
        } catch (err) {
            console.error(err.message);
            return null
        }

    }
}

export default new UserRepository();