const token = localStorage.getItem('token');
const form = document.querySelector('.transaction-form');
const result = document.querySelector('.result');
const sucess = document.createElement('p')
const senderText = document.createElement('p');
const receiverText = document.createElement('p')
   

form.addEventListener('submit', async (event) => {

	event.preventDefault();
	if(!token){
		alert('Não autenticado, faça login novamente');
		window.location.href = '../index.html'
  	} 

	const senderNumberAccount = document.querySelector('.sender').value;
	const receiverNumberAccount = document.querySelector('.receiver').value;
	const amount = document.querySelector('.amount').value;
	const type = document.querySelector('.type').value;


  try {
    const response = await fetch('https://api-transfer-app.cyclic.app/transaction/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({ senderNumberAccount, receiverNumberAccount, type, amount  })
    });

	    const data = await response.json();

	    if (!response.ok) {
		    const message = data.message;
		    alert(message);
		    return;
    }
	
	    sucess.innerHTML = `Sua transferência foi realizada com sucesso!`
	    senderText.innerHTML = `Saldo do emissor: RS ${data.senderBalance.toFixed(2)}`
	    receiverText.innerHTML = `Saldo do receptor: RS ${data.receiverBalance.toFixed(2)}`
	    result.appendChild(sucess);
	    result.appendChild(senderText);
	    result.appendChild(receiverText);
	

  } catch (error) {
     console.error(error);
  }
});