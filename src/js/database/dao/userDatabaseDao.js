/**
 * @param {string} firebaseReference - Referência ao projeto do firebase (Obtido ao inicializar-lo)
 */

import BloodDonation from "../../models/bloodDonationModel";
import User from "../../models/userModel";
import UserDatabase from "../database";

// Data Access Object
// Ultilizar essa classe para chamar as funções da classe UserDatabase
class UserDatabaseDao {
    constructor(firebaseRef){
        this.firebaseReference = firebaseRef
    }

    async writeUserDataDao(
        userId,
        fullName,
        cpf,
        email,
        telNumber,
        birthdayDate,
        genre,
        rhFactor,
        bloodType) {
        return new UserDatabase(this.firebaseReference).writeUserData(
            userId,
            fullName,
            cpf,
            email,
            telNumber,
            birthdayDate,
            genre,
            rhFactor,
            bloodType
        ).catch(error => console.log(error))

    };

    async readUserDataDao(userId) {
        return new Promise((resolve, reject) => {
            new UserDatabase(this.firebaseReference).readUserData(userId)
            .then(queryResult => {

                //Converte os dados recebidos do banco e criar um Objeto User
                resolve(
                    new User(
                        userId,
                        queryResult.fullName,
                        queryResult.idNumber,
                        queryResult.email,
                        queryResult.telNumber,
                        queryResult.birthdayDate,
                        queryResult.genre,
                        queryResult.rhFactor,
                        queryResult.bloodType,
                    )
                );

            })
            .catch(error => console.log(error))
        });
    }

    async writeBloodDonationDao(
        userId,
        time,
        createdDatetime,
        location,
        date) {
        return new UserDatabase(this.firebaseReference).writeBloodDonation(
            userId,
            time,
            createdDatetime,
            location,
            date)
        .catch(error => console.log(error));
    }

    async readBloodDonationDao(userId) {
        return new Promise((resolve, reject) => {
            new UserDatabase(this.firebaseReference).readBloodDonation(userId)
            .then(queryResult => {

                const list = [];
                // Percorre um objeto que contem os itens(outros objetos) recebidos do banco de dados
                Object.getOwnPropertyNames(queryResult).forEach(itemID => {
                    //converte esses dados recebidos em um Objeto BloodDonation
                    list.push(
                        new BloodDonation(
                            itemID,
                            queryResult[itemID].date,
                            queryResult[itemID].location,
                            queryResult[itemID].createdDatetime,
                            queryResult[itemID].time
                        )
                    );
                });
                resolve(list);

            })
            .catch(error => console.log(error));
        });
    }

    async removeBloodDonationDao(userId,itemID){
        return new UserDatabase(this.firebaseReference).removeBloodDonation(userId,itemID)
        .catch(error => console.log(error))
    }
}

export default UserDatabaseDao;
