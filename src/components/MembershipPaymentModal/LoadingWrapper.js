import React from 'react'
import PropTypes from 'prop-types'
import css from './MembershipPaymentModal.css'
import spinner from './images/loading_spinner.gif';


const propTypes = {}

const defaultProps = {}

const LoadingWrapper = props => {
    
    function wrapperClass(theprops) {
        
        if(theprops.isVisible) {

            return css.LoadingWrapperVisible;
        } else {
            return css.loadingWrapperHidden;
        } 
    }

    
    
    return (
        <div className={wrapperClass(props)}>
            <div class={css.contentContainer} >
                <span className={css.loadingText}><img src={spinner} /></span>
                <span>Processing Payment... Please wait.</span>
            </div>
        </div>
    )
    
}

LoadingWrapper.propTypes = propTypes

LoadingWrapper.defaultProps = defaultProps

export default LoadingWrapper
