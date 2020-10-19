import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { 
  NamedLink,
  SliderComponent
} from '../../components';

import css from './SectionSubCats.css';

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

const SectionSubCats = props => {
  const { rootClassName, className } = props;


  const sliderOptions = {
    wrapAround:false,
    contain:true,
  }

  const classes = classNames(rootClassName || css.root, className);


  
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
      <div>
        {/* <FormattedMessage id="SectionLocations.title" /> */}
        <h1 className={css.title}>{props.data ? props.data.title : ''}</h1>
        <span className={css.subTitle}>{props.data ? props.data.description : ''}</span> 
      </div>
      <div className={css.locations}>
      {props.data && props.data.items.length > 0 ? 
        <SliderComponent options={sliderOptions}>        
          {props.data.items.map(loadLocationLinks) }
        </SliderComponent>
      : ''}
      </div>
    </div>
  );
};

SectionSubCats.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionSubCats.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionSubCats;
