const CREATE_USER_URL = "/api/create-user";
const AUTHENTICATE_USER_URL = "/api/authenticate-user";

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

const showAlert = (type, message, element) => {
  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type} alert-dismissible fade show`;
  alertElement.role = "alert";
  alertElement.innerHTML = message;
  element.after(alertElement);
};

const removeAlert = (element) => {
  const existingAlert = element.parentElement.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
};

const handleFormSubmission = async (url, username, password, element, fields) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const { alertType, message } = await response.json();
    showAlert(alertType, message, element);
  } catch (error) {
    showAlert('danger', error.message, element);
  } finally {
    resetFields(fields);
  }
};

const validateFields = (fields) => {
  return fields.every(field => field && field.value.trim() !== "");
};

const resetFields = (fields) => {
  fields.forEach(field => field.value = '');
};

const setupForm = (form, url) => {
  const headingElement = form.querySelector("h2");
  const usernameField = form.querySelector("#username");
  const passwordField = form.querySelector("#password");
  const fieldsToValidate = [usernameField, passwordField];

  const submitForm = (e) => {
    e.preventDefault();
    removeAlert(headingElement);
    if (validateFields(fieldsToValidate)) {
      const username = usernameField.value.trim();
      const password = passwordField.value.trim();
      handleFormSubmission(url, username, password, headingElement, fieldsToValidate);
    } else {
      showAlert('warning', 'Please fill in both fields.', headingElement);
    }
  };

  form.addEventListener("submit", submitForm);
};

if (loginForm) {
  setupForm(loginForm, AUTHENTICATE_USER_URL);
}

if (registerForm) {
  setupForm(registerForm, CREATE_USER_URL);
}
