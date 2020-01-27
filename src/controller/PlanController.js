const Plan = require('../model/Plans');

module.exports = {
    async store(req, res) {
        try {
            if (req.typeUser === 'user') {
                return res.status(401).json({ error: 'Somente empresa pode acessar esta rota' })
            }
            const response = await Plan.create({ ...req.body, company_id: req.userId });
            return res.json(response);
        } catch (error) {
            return res.status(401).json(error)
        }
    },

    
}