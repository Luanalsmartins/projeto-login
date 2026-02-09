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

        campo.classList.remove('success')
        campo.classList.add('error')

        input.classList.remove('input-shake')
        void input.offsetWidth
        input.classList.add('input-shake')
    }
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
    const temOito = senha.length >= 8
    // CORRIGIDO: era passwordValue, agora é senha
    const temLetrasNum = /[a-zA-Z]/.test(senha) && /[0-9]/.test(senha) 

    if (temOito) reqComprimento.classList.replace('invalid', 'valid')
    else reqComprimento.classList.replace('valid', 'invalid')

    if (temLetrasNum) reqForca.classList.replace('invalid', 'valid')
    else reqForca.classList.replace('valid', 'invalid')
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
passwordInput.addEventListener('input', handlePasswordRealTime)
emailInput.addEventListener('blur', validarEmail)
passwordInput.addEventListener('blur', validarSenhaFinal)

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const emailOk = validarEmail()
    const senhaOk = validarSenhaFinal()

    if (emailOk && senhaOk) {
        alert('Login realizado com sucesso! 🚀')
        form.reset()
        document.querySelectorAll('.campo').forEach(c => c.classList.remove('success', 'error'));
        // Reseta as bolinhas para vermelho após o sucesso
        reqComprimento.classList.replace('valid', 'invalid')
        reqForca.classList.replace('valid', 'invalid')
    }
})