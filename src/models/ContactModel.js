const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  register = async () => {
    this.validate();
    this.contact = await ContactModel.create(this.body);
  };

  static getContactById = async (id) => {
    if (typeof id !== "string") return;
    return await ContactModel.findById(id);
  };

  update = async (id) => {
    if (typeof id !== "string") return;
    this.validate();
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  };

  validate = () => {
    this.handleValidate();
    if (this.errors.length > 0) return;
  };

  handleValidate = () => {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido.");

    if (!this.body.email && !this.body.phone)
      this.errors.push(
        "Pelo menos um contato precisa ser preenchido: e-mail ou telefone."
      );

    if (!this.body.name) this.errors.push("Nome é um campo obrigatório.");
  };

  cleanUp = () => {
    for (const key in this.body)
      if (typeof this.body[key] !== "string") this.body[key] = "";

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      phone: this.body.phone,
    };
  };

  static getContacts = async () => {
    return await ContactModel.find().sort({ createdAt: -1 });
  };

  static delete = async (id) => {
    if (typeof id !== "string") return;
    return await ContactModel.findOneAndDelete({ _id: id });
  };
}

module.exports = Contact;
