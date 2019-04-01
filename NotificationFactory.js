"use strict";

// Define a skeleton notification factory
class NotificationFactory { }

// Get notification class name
function getNotificationClass(enteteEvenement) {
    let { source, element, action } = enteteEvenement;

    // Configuration should be in a file
    if ((source == 'academique' && element == 'etudiant/cheminement/programme/activite/note' && action == 'creation')) {
        return 'NotificationNoteFinale';
    }

    // No match
    throw new Error('Cannot find a notification type for: ' + JSON.stringify(enteteEvenement));
}

// Create new Notification instances
NotificationFactory.prototype.createNotification = function (evenement) {
        this.notificationClass = require('./' + getNotificationClass(evenement.entete) + '.js');
        return new this.notificationClass(evenement);
}

module.exports = NotificationFactory;
