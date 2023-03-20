/**
 * @param {string} id - Idenficação do item no Database
 * @param {string} date - Data da doação de sangue
 * @param {string} location - Local do ponto de doação de sangue
 * @param {string} schedulingDatetime - Data e horário que foi feito o agendamento
 */
class BloodDonation {
    constructor(id, date, location, schedulingDatetime) {
        this.id = id;
        this.date = date;
        this.location = location;
        this.schedulingDatetime = schedulingDatetime;
    }
}

export default BloodDonation;
