const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.message
      alert(message);
      return;
    }

    localStorage.setItem('token', data.token);
    window.location.href = '../transaction/transactions.html';
  } catch (error) {
    console.error(error);
    alert('Login failed');
  }
});
