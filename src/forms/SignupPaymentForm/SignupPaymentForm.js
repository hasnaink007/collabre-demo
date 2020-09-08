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

        const formSubmit = () => {

        }

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
                                handleSubmit
                            } = fieldRenderProps;
                            return (
                                <Form onSubmit={formSubmit} >

                                    <div className={css.alignImageItems}>
                                        <SignupImageField />
                                        <SignupImageField />
                                    </div>

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
