const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("home");
  res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("success", ["Seu usuário foi cadastrado com sucesso."]);
    req.session.save(() => {
      return res.redirect("/login/index");
    });
  } catch (err) {
    console.error(err);
    return res.render("500");
  }
};

exports.logon = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.logon();
    
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("success", ["Você entrou no sistema."]);
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect("/home/index");
    });
  } catch (err) {
    console.error(err);
    return res.render("500");
  }
};

exports.logoff = (req, res) => {
  req.session.destroy();
  res.redirect("/");
}
