/**
 * @param {string} firebaseRef - Referência ao projeto do firebase (Obtido ao inicializar-lo)
 * @param {string} this.database - Instância do Banco de dados
 */

import {getDatabase, ref, set, onValue, push, remove} from "firebase/database";

// Ultilizar a classe DAO(userDatabaseDao.js) para se comunicar com o banco de dados
class UserDatabase{
    constructor(firebaseRef){
        this.database = getDatabase(firebaseRef)
    }

    async writeUserData(
        userId,
        fullName,
        idNumber,
        email,
        telNumber,
        birthdayDate,
        genre,
        rhFactor,
        bloodType) {
        return new Promise((resolve, reject) => {
            if (userId) {
                const userDataRef = ref(this.database, 'users/' + userId)

                set(userDataRef, {
                    fullName,
                    idNumber,
                    email,
                    telNumber,
                    birthdayDate,
                    genre,
                    rhFactor,
                    bloodType,
                })
                .then(() => resolve(true))
                .catch(error => reject(error));

            } else
                reject(new Error("O usuário deve estar logado. Uid indefinido"));
        });
    }

    async writeBloodDonation(userId, time, createdDatetime,location,date) {
        return new Promise((resolve,reject) => {
            if (userId) {
                const bloodDonationRef = ref(this.database,
                    'bloodDonation/' + userId);

                // Criar um item de lista
                const newBloodDonation = push(bloodDonationRef)

                //Adiciona os dados ao item de lista e envia ao Banco de dados
                //retorna true caso enviado com sucesso
                set(newBloodDonation, {
                    createdDatetime,
                    time,
                    location,
                    date,
                })
                .then(() => resolve(true))
                .catch(error => reject(error));

            } else
                reject(new Error("O usuário deve estar logado. Uid indefinido"));
        });
    }

    async readBloodDonation(userId) {
        return this.readOnDatabase('bloodDonation/' + userId);
    }

    async readUserData(userId) {
        return this.readOnDatabase('users/' + userId);
    }

    async removeBloodDonation(userId, itemID) {
        return this.removeOnDatabase(`bloodDonation/${userId}/${itemID}`)
    };

    /**
     * @param {string} reference - O caminho exato do item no Banco de dados
     * @param {DatabaseReference} referenceObject - Objeto que representa a localização do item no Banco de dados através do caminho passado
     * @param {DataSnapshot} snapshot - Uma copía específica dos dados (campo ou item) do Banco de dados
     */
    async readOnDatabase(reference) {
        return new Promise((resolve,reject) => {
            try {
                if (reference) {
                    const referenceObject = ref(this.database,reference);

                    //Ler os dados no banco de dados
                    onValue(referenceObject, snapshot => {
                        //Retorna uma copía do(s) dado(s)
                        resolve(snapshot.val());
                    });
                } else
                    reject(new Error("referência indefinida"));

            } catch (error) {
                reject(error);
            }
        });

    }

    /**
     * @param {string} reference - O caminho exato do item no Banco de dados
     * @param {DatabaseReference} referenceObject - Objeto que representa a localização do item no Banco de dados através do caminho passado
     */
    async removeOnDatabase(reference){
        return new Promise((resolve, reject) => {

            if (reference) {
                const referenceObject = ref(this.database, reference);

                // remove o dados do banco de dados
                // retorna true caso excluído com sucesso
                remove(referenceObject)
                .then(() => resolve(true))
                .catch(error =>  reject(error));

            } else
                reject(new Error('Referência indefinida'));
        });
    }

}

export default UserDatabase;
