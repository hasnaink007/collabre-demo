import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { 
  
  NamedLink,
  SliderComponent

} from '../../components';
import {Button} from '../../components';
import image1 from './images/real_estate_hero.jpg';
import image2 from './images/slide2.jpg';
import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);


  const slide2Text = () => {
    return (
        <span>
            Top Network + Advice <br /> <span className={css.lightText}> + (free coffees for helping others)</span>
        </span>
    )
  }


  const slideOptions = {
    autoPlay: 3500,
    wrapAround:true

  }

  const slidesData = [
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
          text: slide2Text(),
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


  const renderSlides = () => slidesData.map((slide) => {

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
      

  });


  return (

    <div>

      <SliderComponent options={slideOptions}> 
          {renderSlides()}
      </SliderComponent>

    </div>
    // <div className={classes}>
    //   <div className={css.heroContent}>
    //     <h1 className={css.heroMainTitle}>
    //       <FormattedMessage id="SectionHero.title" />
    //     </h1>
    //     {/* <h2 className={css.heroSubTitle}>
    //       <FormattedMessage id="SectionHero.subTitle" />
    //     </h2> */}
    //     <NamedLink
    //       name="SearchPage"
    //       to={{
    //         search:
    //           'address=United%20States%20of%20America&bounds=71.540724%2C-66.885444%2C18.765563%2C-179.9',
    //       }}
    //       className={css.heroButton}
    //     >
    //       <FormattedMessage id="SectionHero.browseButton" />
    //     </NamedLink>
    //   </div>
    // </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
