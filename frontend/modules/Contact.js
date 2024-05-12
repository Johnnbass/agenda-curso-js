import validator from "validator";
import Validate from "./Validate";

export default class Contact extends Validate {
  validate = (e) => {
    const el = e.target;
    const nameInput = el.querySelector('input[name="name"]');
    const emailInput = el.querySelector('input[name="email"]');
    const phoneInput = el.querySelector('input[name="phone"]');
    let error = false;

    if (!nameInput.value) {
      alert("Nome é um campo obrigatório.");
      error = true;
    }

    if (!validator.isEmail(emailInput.value)) {
      alert("E-mail inválido.");
      error = true;
    }

    if (!emailInput.value && !phoneInput.value) {
      alert(
        "Pelo menos um contato precisa ser preenchido: e-mail ou telefone."
      );
      error = true;
    }

    if (!error) el.submit();
  };
}
