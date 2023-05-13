/**
 * @param {string} userId - Idenficação do usuário
 * @param {string} fullName - Nome completo
 * @param {number} idNumber - CPF do usuário
 * @param {string} email - E-mail
 * @param {number} telNumber - Numero de telefone
 * @param {string} birthdayDate - Data de nascimento
 * @param {string} genre - Gênero biológico do usuário
 * @param {string} rhFactor - Fator RH, pode ser positivo ou negativo
 * @param {string} bloodType - Tipo sanguíneo, pode ser A, B, AB, O
 */

class User{
    constructor(
        userId,
        fullName,
        idNumber,
        email,
        telNumber,
        birthdayDate,
        genre,
        rhFactor,
        bloodType,
        ) {
        this.userId = userId;
        this.fullName = fullName;
        this.cpf = idNumber;
        this.email = email;
        this.telNumber = telNumber;
        this.birthdayDate = birthdayDate;
        this.genre = genre;
        this.rhFactor = rhFactor;
        this.bloodType = bloodType;
    };
}

export default User;
