import validator from "validator";
import Validate from "./Validate";

export default class Login extends Validate {
  validate = (e) => {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      alert("E-mail inválido.");
      error = true;
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      alert("A senha precisa ter entre 3 e 50 caracteres.");
      error = true;
    }

		if (!error) el.submit();
  };
}
