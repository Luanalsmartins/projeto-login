let tentouEnviar = false
// 1. Seleção de elementos (DOM)
const form = document.querySelector('#login-form')
const emailInput = document.querySelector('#ilogin')
const passwordInput = document.querySelector('#isenha')
const reqComprimento = document.querySelector('#req-comprimento')
const reqForca = document.querySelector('#req-forca')
const btnOlho = document.querySelector('#olho')

// 2. Funções Auxiliares (Helpers)
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

function showError(input, message) {
    const campo = input.parentElement
    const error = campo.querySelector('.error-message')
    if (error) {
        error.innerText = message
    }
    campo.classList.remove('success')
    campo.classList.add('error')

    campo.classList.remove('campo-shake')
    void campo.offsetWidth
    campo.classList.add('campo-shake')
}

function showSuccess(input) {
    const campo = input.parentElement
    const error = campo.querySelector('.error-message') || campo.querySelector('.error')
    if (error) {
        error.innerText = ''
        campo.classList.add('success') // CORRIGIDO: era innerText.add
        campo.classList.remove('error')
    }
}

// 3. Lógica de Validação
function validarEmail() {
    const emailValue = emailInput.value.trim()
    if (emailValue === '') {
        showError(emailInput, 'Email obrigatório')
        return false
    } else if (!isValidEmail(emailValue)) {
        showError(emailInput, 'Digite um email válido')
        return false
    } else {
        showSuccess(emailInput)
        return true
    }
}

function handleEmailRealTime() {
    const emailValue = emailInput.value.trim()
    const campo = emailInput.parentElement
    const error = campo.querySelector('.error-message')

    if (emailValue === '') {
        emailInput.parentElement.classList.remove('error', 'success')
        emailInput.parentElement.querySelector('.error-message').innerText = ''
        return
    }

    if (isValidEmail(emailValue)) {
        showSuccess(emailInput)
    }
}

function validarSenhaFinal() {
    const passwordValue = passwordInput.value.trim()
    const temOito = passwordValue.length >= 8
    const temLetrasNum = /[a-zA-Z]/.test(passwordValue) && /[0-9]/.test(passwordValue)

    if(passwordValue === '') {
        showError(passwordInput, 'A senha é obrigatória')
        return false
    } else if (!temOito || !temLetrasNum) {
        showError(passwordInput, 'A senha não cumpre os requisitos')
        return false
    } else {
        showSuccess(passwordInput)
        return true
    }
}

function handlePasswordRealTime() {
    const senha = passwordInput.value 
    const campo = passwordInput.parentElement

    const temOito = senha.length >= 8
    const temLetrasNum = /[a-zA-Z]/.test(senha) && /[0-9]/.test(senha) 

    const requisitos = document.querySelector('.requisitos-senha')

    if (temOito) reqComprimento.classList.replace('invalid', 'valid')
    else reqComprimento.classList.replace('valid', 'invalid')

    if (temLetrasNum) reqForca.classList.replace('invalid', 'valid')
    else reqForca.classList.replace('valid', 'invalid')

    if (temOito && temLetrasNum) {
        campo.classList.remove('error', 'campo-shake')
        campo.classList.add('success')
    } else {
        campo.classList.remove('success')
        if (!tentouEnviar) campo.classList.remove('error')
    }

    if (temOito && temLetrasNum) {
        requisitos.classList.remove('ativo')
    } else {
        requisitos.classList.add('ativo')
    }
}

btnOlho.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text' // mostra a senha
        btnOlho.innerText = 'visibility_off' 
    } else {
        passwordInput.type = 'password' // esconde a senha
        btnOlho.innerText = 'visibility'
    }
})

// 4. Escutadores de eventos
emailInput.addEventListener('input', handleEmailRealTime)
passwordInput.addEventListener('input', handlePasswordRealTime)

emailInput.addEventListener('blur', validarEmail)
passwordInput.addEventListener('blur', validarSenhaFinal)

form.addEventListener('submit', function (e) {
    e.preventDefault()
    tentouEnviar = true

    const emailOk = validarEmail()
    const senhaOk = validarSenhaFinal()

    const requisitos = document.querySelector('.requisitos-senha')

    if (!senhaOk) {
        requisitos.classList.add('ativo')
        passwordInput.focus()
        return
    }

    if (emailOk && senhaOk) {
        alert('Login realizado com sucesso! 🚀')
        form.reset()
        
        document
        .querySelectorAll('.campo')
        .forEach(c => c.classList.remove('success', 'error', 'campo-shake'));

        reqComprimento.classList.replace('valid', 'invalid')
        reqForca.classList.replace('valid', 'invalid')

        tentouEnviar = false
    }
})