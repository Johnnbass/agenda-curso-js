const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async logon() {
    this.validate();
    this.user = await this.getUser();

    this.checkCredentials();
  }

  async register() {
    this.validate();
    await this.userExists();
    this.hashPassword();
    this.user = await LoginModel.create(this.body);
  }

  checkCredentials() {
    if (!this.user) {
      this.errors.push("Usuário ou Senha inválidos.");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Usuário ou Senha inválidos.");
      this.user = null;
      return;
    }
  }

  hashPassword() {
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
  }

  async userExists() {
    this.user = await this.getUser();
    if (this.user) this.errors.push("Usuário já existe.");
  }

  async getUser() {
    return await LoginModel.findOne({ email: this.body.email });
  }

  validate() {
    this.handleValidate();
    if (this.errors.length > 0) return;
  }

  handleValidate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido.");

    if (this.body.password.length < 3 || this.body.password.length > 50)
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres.");
  }

  cleanUp() {
    for (const key in this.body)
      if (typeof this.body[key] !== "string") this.body[key] = "";

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
