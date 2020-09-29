import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './flickity.css';
import css from './HeroSlider.css';
import Flickity from 'react-flickity-component';

const propTypes = {}

const defaultProps = {
    options: {}
}

class SliderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    FlickityOptions = {
        initialIndex: 0,
        pageDots: false,
        wrapAround:true,
        ...this.props.options


    }

    render() {
        return (
            <div>
                <Flickity
                    options={this.FlickityOptions}


                >
                    {this.props.children}
                    
                </Flickity>

            </div>
            
        )
    }
}

SliderComponent.propTypes = propTypes

SliderComponent.defaultProps = defaultProps

export default SliderComponent;
