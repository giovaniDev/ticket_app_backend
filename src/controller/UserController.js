const User = require('../model/User');

module.exports = {
    async show(req, res) {
        const response = await User.findById(req.userId);
        return res.json(response)
    }
}