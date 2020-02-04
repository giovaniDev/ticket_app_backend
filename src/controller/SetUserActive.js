const User = require('../model/User');

module.exports = {
    async store(req, res) {
        try {
            const { id, secure } = req.params;
            const response = await User.findOne({_id: id, secure})
            if (response === null) {
                res.json({error: 'error'})
            }
            response.active = true;
            response.save();
            return res.json(response)
        } catch (error) {
            
        }
    }
}