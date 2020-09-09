import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const CLEAR_UPDATED_FORM = 'app/ProfileSettingsPage/CLEAR_UPDATED_FORM';

export const UPLOAD_IMAGE_REQUEST = 'app/ProfileSettingsPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/ProfileSettingsPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/ProfileSettingsPage/UPLOAD_IMAGE_ERROR';

export const EXTRA_IMAGE_REQUEST = 'app/ProfileSettingsPage/EXTRA_IMAGE_REQUEST';
export const EXTRA_IMAGE_SUCCESS = 'app/ProfileSettingsPage/EXTRA_IMAGE_SUCCESS';
export const EXTRA_IMAGE_ERROR = 'app/ProfileSettingsPage/EXTRA_IMAGE_ERROR';

export const MEMBERSHIP_PAYMENT_REQUEST = 'app/ProfileSettingsPage/MEMBERSHIP_PAYMENT_REQUEST';

export const UPDATE_PROFILE_REQUEST = 'app/ProfileSettingsPage/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'app/ProfileSettingsPage/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'app/ProfileSettingsPage/UPDATE_PROFILE_ERROR';

// ================ Reducer ================ //

const initialState = {
  image: null,
  uploadImageError: null,
  uploadInProgress: false,
  updateInProgress: false,
  updateProfileError: null,
  membershipPaymentInProgress: false
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_IMAGE_REQUEST:
      // payload.params: { id: 'tempId', file }
      return {
        ...state,
        image: { ...payload.params },
        uploadInProgress: true,
        uploadImageError: null,
      };
    case UPLOAD_IMAGE_SUCCESS: {
      // payload: { id: 'tempId', uploadedImage }
      const { id, uploadedImage } = payload;
      const { file } = state.image || {};
      const image = { id, imageId: uploadedImage.id, file, uploadedImage };
      return { ...state, image, uploadInProgress: false };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      return { ...state, image: null, uploadInProgress: false, uploadImageError: payload.error };
    }

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updateInProgress: true,
        updateProfileError: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        image: null,
        updateInProgress: false,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        image: null,
        updateInProgress: false,
        updateProfileError: payload,
      };


    case EXTRA_IMAGE_REQUEST:
      return {
        ...state,
        image: payload,
        uploadInProgress: true
      }

    case EXTRA_IMAGE_SUCCESS:
      return {
        ...state,
        updatedUser: payload,
        uploadInProgress: false
      }

    case CLEAR_UPDATED_FORM:
      return { ...state, updateProfileError: null, uploadImageError: null };

    case MEMBERSHIP_PAYMENT_REQUEST: 
      return {...state,membershipPaymentInProgress:true}

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const clearUpdatedForm = () => ({
  type: CLEAR_UPDATED_FORM,
});

// SDK method: images.upload
export const uploadImageRequest = params => ({ type: UPLOAD_IMAGE_REQUEST, payload: { params } });
export const uploadImageSuccess = result => ({ type: UPLOAD_IMAGE_SUCCESS, payload: result.data });
export const uploadImageError = error => ({
  type: UPLOAD_IMAGE_ERROR,
  payload: error,
  error: true,
});

// SDK method: sdk.currentUser.updateProfile
export const updateProfileRequest = params => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: { params },
});
export const updateProfileSuccess = result => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: result.data,
});
export const updateProfileError = error => ({
  type: UPDATE_PROFILE_ERROR,
  payload: error,
  error: true,
});


export const extraImageRequest = data => {
  return {
    type:EXTRA_IMAGE_REQUEST,
    payload:data
  }
}

export const extraImageSuccess = data => {
  return { 
    type: EXTRA_IMAGE_SUCCESS,
    payload: data
  } 
}


export const extraImageErorr = (error) => {
  return {
    type:EXTRA_IMAGE_ERROR,
    payload: error
  }
}
 

// ================ Thunk ================ //

// Images return imageId which we need to map with previously generated temporary id
export function uploadImage(actionPayload) {
  return (dispatch, getState, sdk) => {
    const id = actionPayload.id;
    dispatch(uploadImageRequest(actionPayload));

    const bodyParams = {
      image: actionPayload.file,
    };
    const queryParams = {
      expand: true,
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };

    return sdk.images
      .upload(bodyParams, queryParams)
      .then(resp => {
        const uploadedImage = resp.data.data;
        dispatch(uploadImageSuccess({ data: { id, uploadedImage } }));
      })
      .catch(e => dispatch(uploadImageError({ id, error: storableError(e) })));
  };
}



export function uploadSignupImage(actionPayload) { 

  return (dispatch, getState, sdk) => {

    dispatch(extraImageRequest(actionPayload));

    const id = actionPayload.id;
    const fieldIndex = actionPayload.index;


    sdk.images.upload({
      image:actionPayload.file
    })

    .then((resp) => {
        const uploadedImage = resp.data.data;
        console.log(uploadedImage);
        const imageUUID = uploadedImage.id.uuid;

        sdk.currentUser.show().then((resp) => {

          const user = resp.data.data.attributes.profile;

          const {protectedData} = user;
          
          let newImagesData = {};
          
          newImagesData[fieldIndex] = imageUUID;

          // if(protectedData.extra_images) {
          //   if(Array.isArray(protectedData.extra_images)) {

          //     newImagesData = [...newImagesData,...protectedData.extra_images];
          //   }
          // }

          sdk.currentUser.updateProfile({
            protectedData:{extra_images:{...protectedData.extra_images, ...newImagesData}}
          })
          .then(resp => {

            console.log('adding extra image succeded')
            dispatch(extraImageSuccess(resp.data));
          })

          .catch(e => dispatch(extraImageErorr(e)))

        })

        
        dispatch(uploadImageSuccess({data:{id, uploadedImage}}));

    })

    .catch(e => dispatch(uploadImageError({ id, error: storableError(e) })));



  }


}

export const updateProfile = actionPayload => {
  return (dispatch, getState, sdk) => {
    dispatch(updateProfileRequest());

    const queryParams = {
      expand: true,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };

    return sdk.currentUser
      .updateProfile(actionPayload, queryParams)
      .then(response => {
        dispatch(updateProfileSuccess(response));

        const entities = denormalisedResponseEntities(response);
        if (entities.length !== 1) {
          throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
        }
        const currentUser = entities[0];

        // Update current user in state.user.currentUser through user.duck.js
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(updateProfileError(storableError(e))));
  };
};



export function initializeMembershipPayment(data) {

  return (dispatch,getState,sdk) => {
    console.log('triggered');
    dispatch({
      type:MEMBERSHIP_PAYMENT_REQUEST,
      payload: {payment_amount:300}
    })


  }
 

}