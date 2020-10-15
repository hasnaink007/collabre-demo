import React, { Component } from 'react'

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import {ensureCurrentUser, ensureprotectedData} from '../../util/data';

import {chargeStripeCardOnToken, togglePaymentPopup} from '../ProfileSettingsPage/ProfileSettingsPage.duck';

import PropTypes from 'prop-types'

import css from '../AuthenticationPage/AuthenticationPage.css';

import { StripePaymentForm } from '../../forms/';

import {
    Page,
    NamedLink,
    NamedRedirect,
    LinkTabNavHorizontal,
    IconEmailSent,
    InlineTextButton,
    IconClose,
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
    Modal,
    TermsOfService,
    MembershipPaymentModal,
    Button
  } from '../../components';

  import { TopbarContainer } from '../../containers';

const propTypes = {}

const defaultProps = {}

class PaymentPageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stripe:{}
        }

        this.onStripeInitialized = this.onStripeInitialized.bind(this);
    }


    // componentDidMount() {
    //     console.log('mounted');
    //     console.log(this.props.history.location.pathname );
    //     console.log(this.props.currentUser);
    //     if(this.props.currentUser) {
    //         console.log(this.props.currentUser.attributes.profile.protectedData.membershipInfo.success);
    //         if(this.props.currentUser.attributes.profile.protectedData.membershipInfo.success && this.props.history.location.pathname == '/paymentpage') {

    //             console.log('push back to home');
    //         }
    //     }
        

    // }


   

    componentDidUpdate(prevProps) {
        if(this.props.currentUser) {
            
            let protectedData = ensureprotectedData(this.props.currentUser.attributes.profile.protectedData);

            if(protectedData.membershipInfo.success && this.props.history.location.pathname == '/paymentpage') {

                this.props.history.push('/');
            }
        }
    }

    schemaTitle = 'Membership Payments';

    onStripeInitialized(stripe) {

        this.setState({
            stripe:stripe
        });

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
            this.props.chargeStripeCardOnToken(params);

        });


    }

    render() {
        
        const {
            scrollingDisabled,
            chargeStripeCardOnToken,
            togglePaymentModal,
            currentUser,
            paymentPopupOpened,
            stripePaymentInProgress
        } = this.props;

              
        
        const {schemaTitle} = this;
        
        const user = ensureCurrentUser(currentUser);
        
        const userProtectedData = ensureprotectedData(user.attributes.profile.protectedData);
        console.log(userProtectedData);
        const showPaymentBox = Object.keys(user.attributes.profile).length > 0  ? ( userProtectedData.membershipInfo.success ?  !userProtectedData.membershipInfo.success : true) : true; 
        



        return (
            <Page
                title={schemaTitle}
                scrollingDisabled={scrollingDisabled}
                schema={{
                '@context': 'http://schema.org',
                '@type': 'WebPage',
                name: schemaTitle,
                }}
            >
                <LayoutSingleColumn>
                <LayoutWrapperTopbar>
                    <TopbarContainer />
                </LayoutWrapperTopbar>
                <LayoutWrapperMain className={css.layoutWrapperMain}>
                    
                    <div className={css.root}>
                        {showPaymentBox ? (
                            <div className={css.content}>

                                <h2>Thank you for Signing up, on our platform!</h2>
                                <p>
                                    <span>Before you continue using our Platform, you need to activate your account paying a membership fee.</span>
                                </p>

                                <p>
                                    <span>Click on the button below to pay through your card, and then you can continue using our platform. <strong>The cost is 199$ per year.</strong></span>
                                </p>


                                <Button 
                                    onClick={togglePaymentModal}

                                    inProgress={stripePaymentInProgress}
                                >
                                    
                                    Activate Membership                                
                                
                                </Button>

                            </div>
                        ) : <></> }

                        <MembershipPaymentModal 
                            onClose={togglePaymentModal}
                            isOpened={paymentPopupOpened}
                            onSubmitPayment={this.handlePaymentSubmit}
                            onStripeInitialized={this.onStripeInitialized}
                            paymentInProgress={stripePaymentInProgress}
                            currentUser={user}
                        />
                    </div>
                    
                </LayoutWrapperMain>
                <LayoutWrapperFooter>
                    <Footer />
                </LayoutWrapperFooter>
                </LayoutSingleColumn>
            </Page>
        );
    }
}

PaymentPageComponent.propTypes = propTypes

PaymentPageComponent.defaultProps = defaultProps


const mapStateToProps = state => {

    const { currentUser, currentUserListing } = state.user;
    const { 
        paymentPopupOpened  ,
        stripePaymentInProgress 
    } = state.ProfileSettingsPage;
    
    return {
        currentUser,
        paymentPopupOpened,
        stripePaymentInProgress,
        scrollingDisabled:isScrollingDisabled(state)
    };
}
 
const mapDispatchToProps = dispatch => {
    return {
        chargeStripeCardOnToken: params => {dispatch(chargeStripeCardOnToken(params))},
        
        togglePaymentModal: () => { dispatch(togglePaymentPopup()) }
    }
}

const PaymentPage = compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(PaymentPageComponent);

export default PaymentPage;
