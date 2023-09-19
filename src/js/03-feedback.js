import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailData = feedbackForm.querySelector('input[name="email"]');
const messageData = feedbackForm.querySelector('textarea[name="message"]');

const saveDataLocal = () => {
  const formData = {
    email: emailData.value,
    message: messageData.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

feedbackForm.addEventListener('input', throttle(saveDataLocal, 500));

const loadFromLocalStorage = () => {
  const savedFormData = localStorage.getItem('feedback-form-state');

  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailData.value = formData.email;
    messageData.value = formData.message;
  }
};

loadFromLocalStorage();

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = {
    email: emailData.value,
    message: messageData.value,
  };
  console.log('Valores del formulario enviados:', formData);

  localStorage.removeItem('feedback-form-state');
  emailData.value = '';
  messageData.value = '';
});
