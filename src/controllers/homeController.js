const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
  const contacts = await Contact.getContacts();
  res.render("index", { contacts });
};

exports.home = (req, res) => {
  res.render("home");
};
