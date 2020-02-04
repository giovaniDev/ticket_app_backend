const User = require('../model/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transport = require('../config/mail');

module.exports = {

    async store(req, res) {
        try {
            const data = req.body;
            if (data.document_id.length !== 11) {
                return res.status(200).json({ error: 'Document lenght: 11' });
            }
            const hashDocument = await crypto.createHash('sha256').update(data.document_id).digest('hex');
            const hashPassword = await bcrypt.hash(data.password, 10);
            data.document_id = hashDocument;
            data.password = hashPassword;
            data.secure = Math.round(Math.random() * 10000);
            
            const user = await User.create(data);
            if (user) {
                await transport.sendMail({
                    from: '"Pool Up Service" <giovani.rdgs@gmail.com>', // sender address
                    to: `${user.email}`, // list of receivers
                    subject: "Seu código de segurança", // Subject line
                    html: `<h1>Seja Bem Vindo ao Pool Up ${user.name} </h1>
                            <p>Seu código de segurança é: ${data.secure}<p/>` // html body
                })
            }
            user.secure = undefined;
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