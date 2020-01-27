const Company = require('../model/Company');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = {

    async store(req, res) {
        try {
            const data = req.body;
            if (data.document_id.length !== 14) {
                return res.status(401).json({ error: 'Document lenght: 14' });
            }
            const { filename } = req.file;
            const hashDocument = await crypto.createHash('sha256').update(data.document_id).digest('hex');
            const hashPassword = await bcrypt.hash(data.password, 10);
            data.document_id = hashDocument;
            data.password = hashPassword;
            const user = await Company.create({...data, thumbnail: filename});
            return res.json(user);
        } catch (error) {
            if (/email_1/i.test(error.errmsg)) {
                return res.status(401).json({ error: 'Este email já esta cadastrado' });
            }
            if (/document_id_1/i.test(error.errmsg)) {
                return res.status(401).json({ error: 'Este documento já esta cadastrado' });
            }   
            return res.status(401).json(error)
        }
    }
}