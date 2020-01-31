const express = require('express');
const multer = require('multer');

const RegisterUserController = require('./controller/RegisterUserController');
const RegisterCompanyController = require('./controller/RegisterCompanyController');
const AuthUserController = require('./controller/AuthUserController');
const AuthCompanyController = require('./controller/AuthCompanyController');
const UserController = require('./controller/UserController');
const CompanyController = require('./controller/CompanyController');
const PlanController = require('./controller/PlanController');

const route = express.Router();

const { storage, fileFilter } = require('./config/uploadCompanyConfig');
const uploadCompany = multer({storage, fileFilter})

const uploadUserConfig = require('./config/uploadUserConfig');
const uploadUser = multer(uploadUserConfig);

route.post('/register/company', uploadCompany.single('thumbnail') , RegisterCompanyController.store);
route.post('/register/user', uploadUser.single('thumbnail') , RegisterUserController.store);
route.post('/auth', AuthUserController.store);
route.post('/authcompany', AuthCompanyController.store);

const verifyToken = require('./config/verifyToken');
route.use(verifyToken);

route.get('/users', UserController.show);
route.get('/companies', CompanyController.index)
route.post('/companies/plans', PlanController.store)
route.get('/companies/plans/:company_id', PlanController.index)

module.exports = route;