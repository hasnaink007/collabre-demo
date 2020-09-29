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

  return (
    <div className={classes}>
      <div>
        {/* <FormattedMessage id="SectionLocations.title" /> */}
        <h1 className={css.title}>Get Expert Advice</h1>
        <span className={css.subTitle}>Save time &amp; get results by leveraging expertise.</span> 
      </div>
      <div className={css.locations}>
        <SliderComponent options={sliderOptions}>        
          {locationLink(
            'Australia',
            nyImage,
            '?address=New%20York%20City%2C%20New%20York%2C%20USA&bounds=40.917576401307%2C-73.7008392055224%2C40.477399%2C-74.2590879797556'
          )}
          {locationLink(
            'UK',
            laImage,
            '?address=Los%20Angeles%2C%20California%2C%20USA&bounds=34.161440999758%2C-118.121305008073%2C33.9018913203336%2C-118.521456965901'
          )}
          {locationLink(
            'USA',
            sfImage,
            '?address=San%20Francisco%2C%20California%2C%20USA&bounds=37.8324430069081%2C-122.354995082683%2C37.6044780500533%2C-122.517910874663'
          )}
        </SliderComponent>
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
