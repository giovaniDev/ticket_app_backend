const User = require('../model/User');

module.exports = {

    async store(req, res) {
        try {
            const { id } = req.params;
            const { thumbnail } = req.body;
            const { filename } = req.file;
            const user = await User.findByIdAndUpdate(id, { thumbnail: filename });
            return res.json(user);
        } catch (error) {
            return res.status(200).json(error)
        }
    }
}