import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  SignupPaymentComponent
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { 
  updateProfile, 
  uploadImage, 
  uploadSignupImage, 
  initializeMembershipPayment,
  onRemoveImage,
  loadExtraImagesOnLoad,
  chargeStripeCardOnToken,
  togglePaymentPopup
} from './ProfileSettingsPage.duck';

import css from './ProfileSettingsPage.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

const onExtraImageUploadHandler = (values,fn) => {
  const { id, imageId, file, index } = values;
  if (file) {
    fn({ id, imageId, file ,index});
  }
}

export class ProfileSettingsPageComponent extends Component {

  componentDidMount() {
  
    if(this.props.imageUploadState == null) {
      this.props.loadExtraImages();
    } 

  }
  
  
  render() {

    const {
      currentUser,
      currentUserListing,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
      onSignupImageUpload,
      onPaymentRequest,
      onRemoveImage,
      loadExtraImages,
    } = this.props;


    const handleSubmit = values => {
      const { firstName, lastName, bio: rawBio } = values;

      // Ensure that the optional bio is a string
      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio,
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;

      onUpdateProfile(updatedValues);
    };


    const onSignupPaymentSubmit = () => {


      // console.log('submitting payment')
      // console.log(onPaymentRequest);
      onPaymentRequest();



    }


    const onRemoveExtraImage = (imageId) => {
      
      onRemoveImage({imageIndex:imageId});

    }

    const triggerExtraImages = () => {
      loadExtraImages(currentUser);
    }

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const paymentDone = !currentUser ? true : currentUser.attributes.profile.protectedData.extra_images ? currentUser.attributes.profile.protectedData.membershipInfo.success : false;

    const getProfileSettingForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{ firstName, lastName, bio, profileImage: user.profileImage }}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onCertificateImageUpload={e => onExtraImageUploadHandler(e,onSignupImageUpload)}
        onRemoveCertificateImage={onRemoveExtraImage}
        onSubmit={handleSubmit}
        {...this.props}
      />) : null;


      // const getPaymentandImagesForm = (
      //   <SignupPaymentComponent
      //     {...this.props}
          
      //     onPaymentSubmit={onSignupPaymentSubmit}
      //     isFormSubmitting={this.props.membershipPaymentInProgress}
          
      //     triggerExtraImages={triggerExtraImages}
      //     chargeStripeCard={this.props.chargeStripeCard}
      //     paymentPopupOpened={paymentPopupOpened}
      //     togglePaymentModal={togglePaymentModal}
      //     stripePaymentInProgress={stripePaymentInProgress}
      //   />
      // );

    const profileSettingsForm = getProfileSettingForm;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" listing={currentUserListing} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null}
              </div>
              {profileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  currentUserListing: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser, currentUserListing } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
    membershipPaymentInProgress, 
    paymentPopupOpened  ,
    stripePaymentInProgress 
  } = state.ProfileSettingsPage;

  let imageUploadState = state.ProfileSettingsPage.imageUploadState;

  imageUploadState = imageUploadState;

  return {
    currentUser,
    currentUserListing,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
    imageUploadState,
    membershipPaymentInProgress,
    paymentPopupOpened,
    stripePaymentInProgress
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onSignupImageUpload: data => dispatch(uploadSignupImage(data)),
  onPaymentRequest : data => dispatch(initializeMembershipPayment(data)),
  onRemoveImage: data => dispatch(onRemoveImage(data)),
  loadExtraImages: data => dispatch(loadExtraImagesOnLoad(data)),
});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;
