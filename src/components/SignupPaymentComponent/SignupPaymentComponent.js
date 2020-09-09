import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './SignupPaymentForm.css'
import {SignupPaymentForm} from '../../forms/';
const propTypes = {}

const defaultProps = {}

class SignupPaymentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
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


    render() {
        const {
            image
        } = this.props;
       
        return (
            <div>
                <h2>You haven't completed your profile yet.</h2>
                <span>Please complete your profile by adding this required info, in order to use the platform.</span>

                <SignupPaymentForm 
                    formSubmit={this.formSubmit}
                    onImageUpload={this.onImageUpload}
                    images={image}
                    currentUser={this.props.currentUser}
                    isFormSubmitting={this.props.isFormSubmitting}
                />
            </div>
        )
    }
}

SignupPaymentComponent.propTypes = propTypes

SignupPaymentComponent.defaultProps = defaultProps

export default SignupPaymentComponent;
