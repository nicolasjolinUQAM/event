"use strict";

// Should be configured globally, in a file
const configuration = {
    nbDaysBeforeExpiration: 30,
    typeIdCodeMS: 'code_ms',
    typeIdCodePermanent: 'code_permanent_uqam'
}

function getDates(dateEmissionYYMMDD) {
    let startYear = Number(dateEmissionYYMMDD.substr(0, 4));
    let startMonth = Number(dateEmissionYYMMDD.substr(4, 2)) - 1; // index
    let StartDay = Number(dateEmissionYYMMDD.substr(6, 2));

    let dateEmission = new Date(startYear, startMonth, StartDay);
    let dateExpiration = new Date();
    dateExpiration.setTime(dateEmission.getTime() + configuration.nbDaysBeforeExpiration * 86400000);

    return { dateEmission: dateEmission.toISOString(), dateExpiration: dateExpiration.toISOString() }
}

class NotificationNoteFinale {
    constructor(evenement) {
        try {
            let entete = evenement.entete, data = evenement.data;
            let { dateEmission, dateExpiration } = getDates(data.dateEmission);

            this.idCorrelation = entete.id;
            this.idTypeNotification = 12345; // should be changed !!!
            this.idDestinataire = data.codePermanent;
            this.typeIdDestinataire = configuration.typeIdCodePermanent;
            this.dateCreation = dateEmission;
            this.dateExpiration = dateExpiration;
            this.notificationCourte = `Note finale pour le cours ${data.sigle} dans le Portail étudiant.`;
            this.notificationLongue = `Note finale pour le cours ${data.sigle} dans le Portail étudiant.`;
            this.urlReference = 'https://portailetudiant.uqam.ca';

        } catch (err) {
            throw new Error(`Cannot build a ${this.constructor.name}: + ${err}`);
        }
     }

    get notificationData() {
        return {
            idCorrelation: this.idCorrelation,
            idTypeNotification: this.idTypeNotification,
            idDestinataire: this.idDestinataire,
            typeIdDestinataire: this.typeIdDestinataire,
            dateCreation: this.dateCreation,
            dateExpiration: this.dateExpiration,
            notificationCourte: this.notificationCourte,
            notificationLongue: this.notificationLongue,
            urlReference: this.urlReference
        }
    }
}

module.exports = NotificationNoteFinale;
