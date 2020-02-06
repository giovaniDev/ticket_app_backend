const Company = require('../model/Company');
const DigitalCardEntry = require('../model/DigitalCardEntry');


module.exports = {
    async store(req, res) {
        try {
            const user_id = req.userId;
            const data = req.body;
            if (!await Company.findById(data.company_id) ) {
                return res.json({error: "Este clube não existe"})
            }
            const response = await DigitalCardEntry.create({...data, user_id})
            if (response === null) {
                res.json({error: 'error'})
            }
            return res.json(response)
        } catch (error) {
            return res.json(error)
        }
    }
}