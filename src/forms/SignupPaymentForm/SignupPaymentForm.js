import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './SignupPaymentForm.css'
import { Form, PrimaryButton, FieldTextInput, SignupImageField } from '../../components';
import {Form as FinalForm} from 'react-final-form';
const propTypes = {}

const defaultProps = {}

class SignupPaymentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props);
       

        return (
            <div>
                <div>
                    <FinalForm 
                    onSubmit={this.props.formSubmit}
                    {...this.props}
                    render={
                        fieldRenderProps => {
                            const {
                                formSubmit,
                                handleSubmit,
                                onImageUpload,
                                images,
                                currentUser,
                                isFormSubmitting

                            } = fieldRenderProps;
                            
                            const paymentButtonText = isFormSubmitting ? 'Initializing Payment...' : 'Make Payment';


                            return (    
                                <Form onSubmit={formSubmit} >

                                    <div className={css.alignImageItems}>
                                        <SignupImageField 
                                            onImageUpload={onImageUpload}
                                            index={1}
                                            selectedImage={images}
                                        />

                                        <SignupImageField 
                                            onImageUpload={onImageUpload}
                                            index={2}
                                            selectedImage={images}
                                            currentUser = {currentUser}
                                        />
                                        {/* <SignupImageField 
                                            onImageUpload={onImageUpload}
                                            index={1}            
                                            selectedImage={images                                                                        
                                        /> */}



                                    </div>

                                        <hr className={css.separatorMargins} /> 
                                    <h2>

                                        Make Platform Membership Payment
                                    </h2>

                                    <button className={css.payNowButton}>{paymentButtonText}</button>

                                </Form>
                            )




                        }
                    }
                    
                    
                    
                    />


                    {/* <SignupImageField  /> */}


                </div>
            </div>
        )
    }
}

SignupPaymentForm.propTypes = propTypes

SignupPaymentForm.defaultProps = defaultProps

export default SignupPaymentForm
