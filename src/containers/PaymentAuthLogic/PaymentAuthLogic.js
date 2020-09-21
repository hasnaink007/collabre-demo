import React, { Component } from 'react'
import PropTypes from 'prop-types'


const propTypes = {}

const defaultProps = {}

function PaymentAuthLogicWrapper(component) {


    class PaymentAuthLogic extends Component {
        constructor(props) {
            super(props)
            this.state = {
            }
        }

        render() {
        return (
            <div>

                <h3>Hello</h3>
            </div>
        )
        }
    }

    PaymentAuthLogic.propTypes = propTypes

    PaymentAuthLogic.defaultProps = defaultProps


    return (<PaymentAuthLogic> </PaymentAuthLogic>);
}


export default PaymentAuthLogicWrapper;
