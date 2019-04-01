 
"use strict";

const util = require('util');

const NotificationFactory = require('./NotificationFactory.js');
const notificationFactory = new NotificationFactory();

const data = {
    "evenement": {
        "entete": {
            "id": "225552",
            "source": "academique",
            "element": "etudiant/cheminement/programme/activite/note",
            "action": "creation"
        },
        "data": {
            "codePermanent": "AAAA12345678",
            "trimestre": 20191,
            "programme": "7234",
            "sigle": "ADM1200",
            "groupe": 20,
            "note": "A+",
            "dateEmission": "20190312"
        }
    }
};

var notification = notificationFactory.createNotification(data.evenement);
console.log(util.inspect(notification.notificationData));

