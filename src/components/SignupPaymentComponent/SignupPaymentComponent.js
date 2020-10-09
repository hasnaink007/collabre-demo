import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './SignupPaymentForm.css'
import {SignupPaymentForm} from '../../forms/';
import {MembershipPaymentModal} from '../';
import config from '../../config';



const propTypes = {}
const defaultProps = {}

class SignupPaymentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stripe:null
        }


        this.openPaymentPopup = this.openPaymentPopup.bind(this);
        this.onStripeInitialized = this.onStripeInitialized.bind(this);
    }

    formSubmit = (e) => {
        e.preventDefault();
        this.props.onPaymentSubmit();
    }

    onImageUpload = (data) => {
        this.props.onImageUpload(data);
      

    }

    onPaymentSubmit = () => {

        this.props.onPaymentSubmit();

    }

    componentDidMount() {
               
        
    }

    openPaymentPopup = function(e) {
        this.setState({
            paymentPopupOpened:true
        })

    }

    closePaymentPopup = (e) => {
        this.setState({
            paymentPopupOpened:false
        })
    }


    handlePaymentSubmit = (values) => {

        // console.log(values);

        const {card, formValues} = values;

        // debugger;
        this.state.stripe.createToken(card)
        
        .then((token) => {

            // console.log('TOKEN GOT',token);

            const params = {...token, values:formValues};
            
            // console.log('Token done sending payment call');
            this.props.chargeStripeCard(params);

        });


    }


    onStripeInitialized = function(stripe) {

        this.setState({
            stripe:stripe
        });

      

    }



    render() {

        const {
            image,
            imageUploadState,
            onRemoveExtraImage,
            paymentPopupOpened,
            togglePaymentModal,
            stripePaymentInProgress,
            currentUser
        } = this.props;

        
        return (
            
            <div>
                <h2>You haven't completed your profile yet.</h2>
                <span>Please complete your profile by adding this required info, in order to use the platform.</span>
                <div className={css.paymentFormBlock}>
                    <SignupPaymentForm 
                        formSubmit={this.formSubmit}
                        onImageUpload={this.onImageUpload}
                        currentUser={currentUser}
                        isFormSubmitting={this.props.isFormSubmitting}
                        imageUploadState={imageUploadState}
                        onRemoveExtraImage={onRemoveExtraImage}
                        openPaymentPopup={togglePaymentModal}
                        showInitialMessageInput={false}
                        
                    />

                </div>
            </div>
        )
    }
}

SignupPaymentComponent.propTypes = propTypes

SignupPaymentComponent.defaultProps = defaultProps

export default SignupPaymentComponent;
