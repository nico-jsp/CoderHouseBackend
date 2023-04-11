const form = document.getElementById('form')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const boton = document.getElementById('boton')


form.onsubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/jwt/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
        .then((response) => {
            // localStorage.setItem('token', response.token)
            console.log('Todo bien')
            console.log(document.cookie)
        })
}


boton.onclick = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/jwt/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
}