const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.json({error: 'Token not provided'})
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(400).json({error: 'token malformated'});
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/.test(scheme)) {
        return res.status(400).json({error: 'token malformated'});
    }
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
            return res.json({error: err})
        }
        req.userId = decode.id;
        req.typeUser = decode.typeUser
        req.active = decode.active
        if (req.active === false) {
            return res.status(400).json({error: 'Voce nao tem permissao'})
        }
        return next();
    })
}