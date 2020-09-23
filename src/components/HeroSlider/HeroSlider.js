import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './flickity.css';
import css from './HeroSlider.css';
import Flickity from 'react-flickity-component';
import {Button} from '../../components';
import image1 from './images/real_estate_hero.jpg';
import image2 from './images/slide2.jpg';


const propTypes = {}

const defaultProps = {}

class HeroSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    slide2Text = () => {
        return (
            <span>
                Top Network + Advice <br /> <span className={css.lightText}> + (free coffees for helping others)</span>
            </span>
        )
    }

    slidesData = [
        {
            image:image1,
            text: "A collaborative space to share jouneys, solve problems and build together.",
            ctaText:'Start now',
            ctaLink:'#',
            slideStyle:{
                wrapperStyle:{

                },
                textStyle: {
                    wrapper:{},
                    text: {

                    }
                }

            },
            overlay:1,
        },
        {
            image:image2,
            text: this.slide2Text(),
            ctaText:'',
            ctaLink:'#',
            slideStyle: {
                wrapperStyle:{

                },
                textStyle:{
                    wrapper: {
                        maxWidth:'initial',
                        width:'100%',
                        textAlign:'center',
                    },
                    text: {
                        color:'#797979',
                        textShadow: 'none'
                    }
                }
            
            },
            overlay:0
        }
    ]


    renderSlides = () => this.slidesData.map((slide) => {

        let slideWrapperStyle = {
            backgroundImage:`url(${slide.image})`,
        };

        if(!slide.overlay) {
            slideWrapperStyle.backgroundBlendMode = 'unset';
        }
        
        slideWrapperStyle = {...slideWrapperStyle,...slide.slideStyle.wrapperStyle};

        return (

            <div className={css.SlideWrapper} 
                style={slideWrapperStyle}
            >
                {/* <img src={slide.image} /> */}
                <div class={css.slideTextWrapper} style={slide.slideStyle.textStyle.wrapper}>
                    <h3 style={slide.slideStyle.textStyle.text}>{slide.text}</h3>
                    {slide.ctaText != '' ? 
                    <div className={css.ctaButtonWrap}>
                        <Button>
                            {slide.ctaText}
                        </Button>
                    </div>

                    : null}
                </div>
            </div>
        )
        

    })

    FlickityOptions = {
        initialIndex: 0,
        pageDots: false


    }

    render() {
        return (
            <div>
                <Flickity
                    options={this.FlickityOptions}


                >

                    {this.renderSlides()}
                </Flickity>

            </div>
            
        )
    }
}

HeroSlider.propTypes = propTypes

HeroSlider.defaultProps = defaultProps

export default HeroSlider;
