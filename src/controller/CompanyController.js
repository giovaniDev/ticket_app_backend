const Company = require('../model/Company');

module.exports = {
    async index(req, res) {
        const { city } = req.query;
        if (req.typeUser === 'company') {
            return res.json({error: 'Somente usuarios podem ter acesso a esta rota'})
        }
        const response = await Company.find({ city }).select('-password');
        return res.json(response);
        
    }
}