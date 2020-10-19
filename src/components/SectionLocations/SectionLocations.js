import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { 
  NamedLink,
  SliderComponent
} from '../../components';

import css from './SectionLocations.css';

import nyImage from './images/1.jpg';
import laImage from './images/2.jpg';
import sfImage from './images/3.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper} style={{backgroundImage:`url(${image})`}} >
          {/* <LazyImage src={image} alt={name} className={css.locationImage} /> */}
          <div>
              <h1 className={css.boxStyle}>
                <FormattedMessage
                  id="SectionLocations.listingsInLocation"
                  values={{ location: nameText }}
                />
              </h1>
          </div>
        </div>
      </div>
      {/* <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </div> */}
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  const sliderOptions = {
    initialIndex: 1,
    contain:true,
    wrapAround:false,
  }


  const loadLocationLinks = item => {

    const images = [nyImage, laImage, sfImage];
    let random = Math.random() * images.length;

    random = Math.floor(random);

    let imageUrl = item.image ? item.image : 'https://picsum.photos/id/171/400';

    return (
      locationLink(
        item.label,
        imageUrl,
        item.url
      )

    )


  }

  return (
    <div className={classes}>
      <div className={css.title}>
        <span>{props.data ? props.data.title : ''}</span>
        <span className={css.subTitle}>{props.data ? props.data.description : '' }</span>
      </div>
      <div className={css.locations}>
        <SliderComponent
          options={sliderOptions}
        >
          {
            props.data ? 
              props.data.items.map(loadLocationLinks)
            : 
            ''
          }
        </SliderComponent>
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
