import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { 
  NamedLink,
  SliderComponent
} from '../../components';

import css from './SectionPropertyType.css';

import fhimage from './images/4.jpg';
import appimage from './images/5.jpg';
import vimage from './images/6.jpg';

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
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        {/* <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />  */}

        <span style={{color:'#f72a85'}}>{name}</span>
      </div>
    </NamedLink>
  );
};

const SectionPropertyType = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  const sliderOptions = {

    wrapAround:false,
    contain:true

  }


  const loadLocationLinks = item => {

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
        
        <span className={css.subTitle}>{props.data ? props.data.description : ''}</span>

      </div>
      <div className={css.locations}>
        {props.data && props.data.items.length > 0 ? 
        <SliderComponent options={sliderOptions}>
          {
            props.data ? 
            props.data.items.map(loadLocationLinks)
            : 
            ''
          }
        </SliderComponent>

        : ''}
      </div>
    </div>
  );
};

SectionPropertyType.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionPropertyType.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionPropertyType;