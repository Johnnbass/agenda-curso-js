const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contactController = require("./src/controllers/contactController");

const { loginRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/", homeController.index);
route.get("/home/index", homeController.home);

// Rotas de login
route.get("/login/index", loginController.index);
route.get("/login/logoff", loginController.logoff);
route.post("/login/logon", loginController.logon);
route.post("/login/register", loginController.register);

// Rotas de contato
route.get("/contato/index", loginRequired, contactController.index);
route.get("/contato/editar/:id", loginRequired, contactController.edit);
route.get("/contato/delete/:id", loginRequired, contactController.delete);
route.post("/contato/update/:id", loginRequired, contactController.update);
route.post("/contato/register", loginRequired, contactController.register);

module.exports = route;
