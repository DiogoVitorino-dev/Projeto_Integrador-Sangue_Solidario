const regexEmail = '[a-z|A-Z|0-9|_|.|-]+@[a-z|A-Z|0-9|_|.|-|ç|Ç]+';
const regexCpf = '[0-9]+';
const regexFullname = '[a-z|A-Z|\\s|á|à|â|ã|ä|é|è|ê|ë|í|ì|î|ï|ó|ò|ô|õ|ö|ú|ù|û|ü|ç|Ç]+';
const regexPassword =
  '[a-z|A-Z|0-9|!|ç|Ç|"|#|$|%|&|\'|(|)|*|+|,|-|.|/|:|;|<|=|>|?|@||^|_|`|{|}|~]{8,100}';

export function verifyEmail(email) {
    return new Promise((resolve, reject) => {

        if (email) {
            // Verificar se há caracteres inapropriados no email
            const regexResult = RegExp(regexEmail).exec(email)

            if (regexResult[0] === email) resolve()

            else reject(new Error('Apenas letras minúsculas e maiúsculas, números e simbolos _ - . são permitidos'))

        }else reject(new Error('Email vazio'))

    })
}

export function verifyPassword(password='') {
    return new Promise((resolve, reject) => {
        if (password) {
            // Verificar o número de caracteres da Senha
            if(password.length >= 8 && password.length <= 100) {

                // Verificar se há caracteres inapropriados na Senha
                const regexResult = RegExp(regexPassword).exec(password)

                if (regexResult[0] === password) resolve()

                else reject(new Error('Contém caractere(s) inapropriados'))

            }else reject(new Error('A senha deve conter no mínimo 8 caracteres e no máximo 100 caracteres'))

        }else reject(new Error('Senha vazia'))

    })
}

export function verifyCpf(cpf=0) {
    return new Promise((resolve, reject) => {
        if (cpf) {
            // Verificar o número de caracteres da Senha
            if(cpf.length === 11) {

                // Verificar se há caracteres inapropriados na Senha
                const regexResult = RegExp(regexPassword).exec(cpf)

                if (regexResult[0] === cpf) resolve()

                else reject(new Error('Contém caractere(s) inapropriados'))

            }else reject(new Error('O numero de CPF contém apenas 11 caracteres'))

        }else reject(new Error('cpf vazio'))

    })
}

export function verifyFullName(fullname='') {
    return new Promise((resolve, reject) => {
        if (fullname) {
            // Verificar o número de caracteres da nome
            if(fullname.length >= 8 && fullname.length <= 300) {

                // Verificar se há caracteres inapropriados na nome
                const regexResult = RegExp(regexFullname).exec(fullname)

                if (regexResult[0] === fullname) resolve()

                else reject(new Error("Contém caractere(s) inapropriados"))

            } else reject(new Error("O nome completo deve ter no mínimo 8 caracteres"))

        } else reject(new Error("Nome Vazio"))
    })
}
