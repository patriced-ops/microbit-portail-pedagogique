enum OuiNon {
    //% block="OUI"
    OUI = 1,
    //% block="NON"
    NON = 0
}

enum CapteurPortail {
    //% block="bouton entrée"
    BoutonEntree,
    //% block="bouton sortie"
    BoutonSortie,
    //% block="fin de course ouvert"
    FinCourseOuvert,
    //% block="fin de course fermé"
    FinCourseFerme,
    //% block="barrière infrarouge"
    BarriereIF
}

enum ActionPortail {
    //% block="ouvrir le portail"
    Ouvrir,
    //% block="fermer le portail"
    Fermer,
    //% block="arrêter le portail"
    Arreter
}

enum VoyantEtat {
    //% block="allumer le voyant"
    Allumer,
    //% block="éteindre le voyant"
    Eteindre
}
function pinCapteur(capteur: CapteurPortail): DigitalPin {
    switch (capteur) {
        case CapteurPortail.BoutonEntree: return DigitalPin.P14
        case CapteurPortail.BoutonSortie: return DigitalPin.P0
        case CapteurPortail.FinCourseOuvert: return DigitalPin.P15
        case CapteurPortail.FinCourseFerme: return DigitalPin.P1
        case CapteurPortail.BarriereIF: return DigitalPin.P12
    }
}

function pinOuvrir(): DigitalPin {
    return DigitalPin.P16
}

function pinFermer(): DigitalPin {
    return DigitalPin.P2
}

function pinVoyant(): DigitalPin {
    return DigitalPin.P8
}
/**
 * Extension pédagogique pour portail automatique
 */
//% color=#2b78e4 weight=100 icon="\uf0a3"
namespace portail {

    /**
     * Indique si un capteur est activé
     */
    //% block="capteur %capteur activé"
    export function capteurActif(capteur: CapteurPortail): OuiNon {
        return pins.digitalReadPin(pinCapteur(capteur)) == 1
            ? OuiNon.OUI
            : OuiNon.NON
        /**
     * Commande le moteur du portail
     */
        //% block="action portail : %action"
        function actionPortail(action: ActionPortail): void {
            switch (action) {
                case ActionPortail.Ouvrir:
                    pins.digitalWritePin(pinOuvrir(), 1)
                    pins.digitalWritePin(pinFermer(), 0)
                    break

                case ActionPortail.Fermer:
                    pins.digitalWritePin(pinOuvrir(), 0)
                    pins.digitalWritePin(pinFermer(), 1)
                    break

                case ActionPortail.Arreter:
                    pins.digitalWritePin(pinOuvrir(), 0)
                    pins.digitalWritePin(pinFermer(), 0)
                    break
            }
        }

        /**
         * Commande le voyant
         */
        //% block="%etat"
        function voyant(etat: VoyantEtat): void {
            pins.digitalWritePin(pinVoyant(),
                etat == VoyantEtat.Allumer ? 1 : 0)
        }
    }


    /**
     * Version logique pour les conditions
     */
    //% block="capteur %capteur est activé"
    function capteur(capteur: CapteurPortail): boolean {
        return pins.digitalReadPin(pinCapteur(capteur)) == 1
    }
}