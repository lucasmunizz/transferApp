const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = document.querySelector('.name').value;
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;
  const confirmPassword = document.querySelector('.confirm-password').value;

  const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  console.log(name,username,password, confirmPassword)

  if(!(passwordValidation.test(password))){
      alert('A senha deve conter 8 dígitos, caracteres especiais, letras maiúsculas e minúsculas')
      return;
  };

  if (password !== confirmPassword) {
    alert('As senhas não batem!');
    return;
  }

  
  try {
   const response = await fetch('https://api-transfer-app.cyclic.app/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, password })
  });
  window.location.href = '../login/login.html';
  } catch (error) {
      console.log(error);
  }
 
});