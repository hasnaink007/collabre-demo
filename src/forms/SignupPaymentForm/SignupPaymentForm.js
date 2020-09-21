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
        const {imageUploadState} = this.props;

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
                                isFormSubmitting,
                                onRemoveExtraImage,
                                openPaymentPopup
                            } = fieldRenderProps;

                            
                            const paymentButtonText = isFormSubmitting ? 'Initializing Payment...' : 'Make Payment';

                            // const uploadedImages = currentUser ? currentUser.attributes.profile.protectedData.extra_images : null;
                            return (    
                                <div>
                                    {/* <Form onSubmit={formSubmit} ></Form> */}


                                    <div className={css.LabelBlock}>
                                        <span className={css.labelText}>
                                            Training/ Mentorship Invoice or Certificate of completion is required to post 
                                        </span>

                                        <span className={css.helperText}>
                                            (Please provide a copy/ screenshot of the original within 14 days of signup or your membership will be put on hold)
                                        </span>
                                    </div>
                                    
                                    <div className={css.alignImageItems}>
                                        <SignupImageField 
                                            onImageUpload={onImageUpload}
                                            index={1}
                                            imageUploadState={imageUploadState}
                                            onRemoveExtraImage={onRemoveExtraImage}
                                        />

                                        <SignupImageField 
                                            onImageUpload={onImageUpload}
                                            index={2}
                                            imageUploadState={imageUploadState}
                                            onRemoveExtraImage={onRemoveExtraImage}
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

                                    <button className={css.payNowButton} onClick={openPaymentPopup}>{paymentButtonText}</button>

                                </div>
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
