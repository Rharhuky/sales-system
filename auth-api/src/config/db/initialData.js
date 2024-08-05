import bcrypt from "bcrypt";

import User from "../../modules/user/model/User.js"

export async function initDate() {
    try {
        await User.sync({ force: true });

        let testPassword = await bcrypt.hash("test123", 10);

        await User.create({
            name: 'User Test',
            email: 'user@mail.com.test',
            password: testPassword
        });

        await User.create({
            name: 'admin',
            email: 'admin@mail.com',
            password: 'admin123'
        });

    } catch (err) {
        console.log(err)
    }

}