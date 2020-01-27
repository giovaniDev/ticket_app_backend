const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Company = require('../model/Company');

module.exports = {

    async store(req, res) {
        try {
            const { email, password } = req.body;
            const company = await Company.findOne({ email });
            if (!company) {
                return res.status(200).json({ error: 'User not found' });
            }
            if (!await bcrypt.compare(password, company.password) ) {
                return res.status(200).json({ error: 'Bad Password' });
            }
            company.password = undefined;
            const token = await jwt.sign({ id: company.id, typeUser: 'company' }, process.env.SECRET);
            return res.status(200).json({company, token})
        } catch (error) {
            res.status(200).json(error)
        }
    }
}