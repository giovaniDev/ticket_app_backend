const User = require('../model/User');
const Company = require('../model/Company');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cpf = require('cpf');

module.exports = {

    async store(req, res) {
        try {
            const data = req.body;
            const typeUser = req.headers.typeuser; 
            const hashDocument = await crypto.createHash('sha256').update(data.document_id).digest('hex');
            const hashPassword = await bcrypt.hash(data.password, 10);
            if (typeUser === 'company') {
                if (data.document_id.length !== 14) {
                    return res.status(200).json({ error: 'Document lenght: 14' });
                }
                data.document_id = hashDocument;
                data.password = hashPassword;
                user = await Company.create(data);
            } else {
                if (data.document_id.length !== 11) {
                    return res.status(200).json({ error: 'Document lenght: 11' });
                }
                if (!cpf.isValid(data.document_id)) {
                    return res.status(200).json({ error: 'Invalid Document' });
                }
                data.document_id = hashDocument;
                data.password = hashPassword;
                user = await User.create(data);
            }
            
            return res.json(user);
        } catch (error) {
            if (/email_1/i.test(error.errmsg)) {
                return res.status(200).json({ error: 'Este email já esta cadastrado' });
            }
            if (/document_id_1/i.test(error.errmsg)) {
                return res.status(200).json({ error: 'Este documento já esta cadastrado' });
            }   
            return res.status(200).json(error)
        }
    }
}