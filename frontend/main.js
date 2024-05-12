import "core-js/stable";
import "regenerator-runtime/runtime";

import Contact from "./modules/Contact";	
import Login from "./modules/Login";

const login = new Login(".form-login");
login.init();

const register = new Login(".form-register");
register.init();

const contact = new Contact(".form-contact");
contact.init();

import "./assets/css/style.css";
