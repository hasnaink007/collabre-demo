import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './MembershipPaymentModal.css'
import {Modal} from '../';
import { StripePaymentForm } from '../../forms';
import LoadingWrapper from './LoadingWrapper';
const propTypes = {}

const defaultProps = {}

class MembershipPaymentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        const { paymentInProgress } = this.props;

        
        const {firstName, lastName} = (this.props.currentUser.attributes.profile) ? this.props.currentUser.attributes.profile : {firstName:'', lastName:''};
        const initialVals = {
            name: `${firstName} ${lastName}`
        }

        return (
            <Modal
                isOpen={this.props.isOpened}
                isClosedClassName={css.closedModel}
                onClose={() => this.props.onClose()}
                closeButtonMessage={null}
                onManageDisableScrolling={() => false}
            >
                <div className={css.mainModalWrapper}>
                    {(!paymentInProgress) ? 
                    
                    <div>
                    <h3>Make a Payment for your Membership through Stripe. </h3>
                    <h3>Membership Cost: 300$ one time</h3>

                    <hr />

                    <h3>Pay Through Stripe:</h3>

                    <StripePaymentForm 
                        onStripeInitialized={this.props.onStripeInitialized}
                        onSubmit={this.props.onSubmitPayment}
                        initialValues={initialVals}
                        
                    />

                    </div>

                    : 

                    <LoadingWrapper isVisible={paymentInProgress} />
                    
                    }
                </div>
            </Modal>
        )
    }
}

MembershipPaymentModal.propTypes = propTypes

MembershipPaymentModal.defaultProps = defaultProps

export default MembershipPaymentModal;
