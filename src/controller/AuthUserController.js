const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');

module.exports = {

    async store(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(200).json({ error: 'User not found' });
            }
            if (!await bcrypt.compare(password, user.password) ) {
                return res.status(200).json({ error: 'Bad Password' });
            }
            if (user.active === false) {
                return res.status(200).json({ error: 'User not active' });
            }
            user.password = undefined;
            const token = await jwt.sign({ id: user.id, typeUser: 'user', active: user.active }, process.env.SECRET);
            return res.status(200).json({user, token})
        } catch (error) {
            res.status(200).json(error)
        }
    }
}