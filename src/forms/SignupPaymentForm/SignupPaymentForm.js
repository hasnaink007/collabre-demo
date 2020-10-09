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
        const {
            imageUploadState,
            onImageUpload,
            onRemoveExtraImage,

    
        } = this.props;
        
        
        return (
            <div>
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

                </div>


            </div>
            </div>
                            


            )
    }
}

SignupPaymentForm.propTypes = propTypes

SignupPaymentForm.defaultProps = defaultProps

export default SignupPaymentForm
