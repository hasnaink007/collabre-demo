// Main Functions reside in ProfileSettingsPage Ducks

import {chargeStripeCardOnToken, togglePaymentPopup} from '../ProfileSettingsPage/ProfileSettingsPage.duck';


export const chargeStripeCard = (params) =>{

    chargeStripeCardOnToken(params);
    
}


export const togglePaymentBox = () => {
    togglePaymentPopup();
}


export const isUserPaid = (user) => {



}