const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  res.render("contact", { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("/contato/index");
      });
      return;
    }

    req.flash("success", ["O contato foi cadastrado com sucesso."]);
    req.session.save(() => {
      return res.redirect(`/contato/editar/${contact.contact._id}`);
    });
  } catch (err) {
    console.error(err);
    return res.render("500");
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.render("404");

  const contact = await Contact.getContactById(id);

  if (!contact) return res.render("404");

  res.render("contact", { contact });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.render("404");

  try {
    const contact = new Contact(req.body);
    await contact.update(id);

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect(`/contato/editar/${id}`);
      });
      return;
    }

    req.flash("success", ["O contato foi atualizado com sucesso."]);
    req.session.save(() => {
      return res.redirect(`/contato/editar/${id}`);
    });
  } catch (err) {
    console.error(err);
    return res.render("500");
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.render("404");

  try {
    const contact = await Contact.delete(id);

    if (!contact) return res.render("404");

    req.flash("success", ["O contato foi excluído com sucesso."]);
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    return res.render("500");
  }
};
