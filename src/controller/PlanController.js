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

    async index(req, res) {
        try {
            if (req.typeUser === 'company') {
                return res.status(401).json({ error: 'Somente usuarios pode acessar esta rota' })
            }
            const { company_id } = req.params;
            const data = await Plan.find({ company_id });
            return res.json(data);
        } catch (error) {
            return res.json(error);
        }
    }
}