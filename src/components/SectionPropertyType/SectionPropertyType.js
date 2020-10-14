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


  

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionPropertyTypes.title" />
        
        <span className={css.subTitle}><FormattedMessage id="SectionPropertyTypes.subTitle" /></span>

      </div>
      <div className={css.locations}>
        <SliderComponent options={sliderOptions}>
          {locationLink(
            'Buy to Let',
            appimage,
            '?address=New%20York%20City%2C%20New%20York%2C%20USA&bounds=40.917576401307%2C-73.7008392055224%2C40.477399%2C-74.2590879797556'
          )}
          {locationLink(
            'Renovation',
            vimage,
            '?address=Los%20Angeles%2C%20California%2C%20USA&bounds=34.161440999758%2C-118.121305008073%2C33.9018913203336%2C-118.521456965901'
          )}
          {locationLink(
            'Social Housing',
            fhimage,
            '?address=San%20Francisco%2C%20California%2C%20USA&bounds=37.8324430069081%2C-122.354995082683%2C37.6044780500533%2C-122.517910874663'
          )}
        </SliderComponent>
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