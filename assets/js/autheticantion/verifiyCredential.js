const regexEmail = '[a-z|A-Z|0-9|_|.|-]+@[a-z|A-Z|0-9|_|.|-]+';
const regexPassword =
  '[a-z|A-Z|0-9|!|"|#|$|%|&|\'|(|)|*|+|,|-|.|/|:|;|<|=|>|?|@||^|_|`|{|}|~]{8,100}';

export function verifyEmail(email) {
    return new Promise((resolve, reject) => {

        if (email) {
            // Verificar se há caracteres inapropriados no email
            const regexResult = RegExp(regexEmail).exec(email)
            console.log(regexResult[0] === email);

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
