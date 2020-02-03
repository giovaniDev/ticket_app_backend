const express = require('express');
const multer = require('multer');

const RegisterUserController = require('./controller/RegisterUserController');
const ThumbnailUserController = require('./controller/ThumbnailUserController');
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
route.post('/register/user' , RegisterUserController.store);
route.post('/register/user/thumbnail/:id', uploadUser.single('thumbnail') , ThumbnailUserController.store);
route.post('/auth', AuthUserController.store);
route.post('/authcompany', AuthCompanyController.store);

const verifyToken = require('./config/verifyToken');

route.get('/users', verifyToken, UserController.show);
route.get('/companies', verifyToken, CompanyController.index)
route.post('/companies/plans', verifyToken, PlanController.store)
route.get('/companies/plans/:company_id', verifyToken, PlanController.index)

module.exports = route;