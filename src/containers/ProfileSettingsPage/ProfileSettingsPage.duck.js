import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';
import {
  uploadImagesToStorage,
  chargeStripePayment
} from '../../util/api';
import ProfileSettingsPage from './ProfileSettingsPage';
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


export const REMOVE_IMAGE_REQUEST = 'app/ProfileSettingsPage/REMOVE_IMAGE_REQUEST';
export const REMOVE_IMAGE_SUCCESS = 'app/ProfileSettingsPage/REMOVE_IMAGE_SUCCESS';
export const REMOVE_IMAGE_ERROR = 'app/ProfileSettingsPage/REMOVE_IMAGE_ERROR';


export const CHARGE_STRIPE_REQUEST = 'app/ProfileSettingsPage/CHARGE_STRIPE_REQUEST';
export const CHARGE_STRIPE_SUCCESS = 'app/ProfileSettingsPage/CHARGE_STRIPE_SUCCESS';
export const CHARGE_STRIPE_ERROR = 'app/ProfileSettingsPage/CHARGE_STRIPE_ERROR';

export const LOAD_EXTRA_IMAGES_ON_LOAD = 'app/ProfileSettingsPage/LOAD_EXTRA_IMAGES_ON_LOAD';

export const CHANGE_MEMBERSHIP_PAYMENT_POPUP = 'app/ProfileSettingsPage/OPEN_MEMBERSHIP_PAYMENT_POPUP';
// ================ Reducer ================ //

const initialState = {
  image: null,
  uploadImageError: null,
  uploadInProgress: false,
  updateInProgress: false,
  updateProfileError: null,
  membershipPaymentInProgress: false,
  imageUploadState:null,
  stripePaymentInProgress:false,
  paymentPopupOpened:false,
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
      const newImageUploadState = state.imageUploadState.push(payload);
      return {
        ...state,
        imageUploadState: state.imageUploadState,
        uploadInProgress: false
      }

    case CLEAR_UPDATED_FORM:
      return { ...state, updateProfileError: null, uploadImageError: null };

    case MEMBERSHIP_PAYMENT_REQUEST: 
      return {...state,membershipPaymentInProgress:true}
    
    case REMOVE_IMAGE_SUCCESS:
      return {...state, ...payload};

    case REMOVE_IMAGE_REQUEST:
      return {...state,...payload}

    case LOAD_EXTRA_IMAGES_ON_LOAD: 
      return {...state,imageUploadState:payload}

    case CHARGE_STRIPE_REQUEST: 
      return {...state, ...payload}

    case CHARGE_STRIPE_SUCCESS:
      return { ...state,...payload }
    
    case CHANGE_MEMBERSHIP_PAYMENT_POPUP:
      return {...state,...payload}


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


export const removeImageRequest = (data) => {
  return {
    type:REMOVE_IMAGE_REQUEST,
    payload: data
  }
}

export const removeImageSuccess = (data) => {

  return {
    type:REMOVE_IMAGE_SUCCESS,
    payload:data
  }
}
 
export const removeImageError = (error) => {
  return {
    type:REMOVE_IMAGE_ERROR,
    payload:error
  }
}

export const loadExtraImages = (data) => {
  return {
    type:LOAD_EXTRA_IMAGES_ON_LOAD,
    payload:data
  }
}


export const chargeStripeRequest = () => {

  return{
    type:CHARGE_STRIPE_REQUEST,
    payload:{stripePaymentInProgress:true}
  } 
}

export const chargeStripeSuccess = (data) => {
  return {
    type:CHARGE_STRIPE_SUCCESS,
    payload:{stripePaymentInProgress:false,...data},
  }
}


export const changePaymentPopup = (popupState)=> {

  return {
    type: CHANGE_MEMBERSHIP_PAYMENT_POPUP,
    payload:{paymentPopupOpened:popupState}
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
    const form_data = new FormData();
    // console.log(actionPayload);
    form_data.append('extraImage',actionPayload.file);
    form_data.append('fileId',actionPayload.id);

    // debugger;

    uploadImagesToStorage({
      file:form_data,
      fileID:actionPayload.id,
      fieldIndex:actionPayload.index
    },(err,data) => {
      if(err) extraImageErorr(err);      
      if(data) {
        console.log('final Data',data);

        const responseData = {
          response:data,
          id:id,
          index:fieldIndex,
          file:data.image_url,
          imageId:id
        };

        // dispatch(extraImageSuccess(responseData));

        sdk.currentUser.show().then((resp) => {

          const user = resp.data.data.attributes.profile;

          const {protectedData} = user;
          
          let newImagesData = {};
          
          newImagesData[fieldIndex] = data.image_url;

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
            dispatch(extraImageSuccess(responseData));
          })

          .catch(e => dispatch(extraImageErorr(e)))

        })


      }


    } )
   

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

    dispatch({
      type:MEMBERSHIP_PAYMENT_REQUEST,
      payload: {payment_amount:300}
    })


  }
 

}




export function onRemoveImage(data) {

  const {imageIndex} = data;



  return (dispatch, state, sdk ) => {

      let currentImageUploadState = state().ProfileSettingsPage.imageUploadState
     
      if(currentImageUploadState.length > 0) {
    
        let indexNumber = currentImageUploadState.findIndex((image) => {
          if(parseInt(image.index) == parseInt(imageIndex)) {
            return true;
          }
        });
        delete currentImageUploadState[indexNumber].imageId;      
        dispatch(removeImageRequest({uploadInProgress:true,imageUploadState:currentImageUploadState}))
          

      }
      
      
    sdk.currentUser.show().then((resp) => {
      
      const user = resp.data.data.attributes.profile;
      const updatedExtraImages = user.protectedData.extra_images;

      delete updatedExtraImages[imageIndex];
      
      console.log(updatedExtraImages);

      sdk.currentUser.updateProfile({
        protectedData:{
          extra_images:updatedExtraImages
        }
      }).then((res) => {
        if(res.status = 200) {

          let finalArray = [];


          for(const image in updatedExtraImages) {
            finalArray.push({                    
              file: updatedExtraImages[image],
              id: image,
              index:image,
              imageId:image
          })

          }
          
          dispatch(removeImageSuccess({uploadInProgress:false,imageUploadState:finalArray}));
        }
        

      })

      .catch((err) => {
        console.log('ERROR TRIGGERED',err);
        dispatch(removeImageError(err));
        
      })

    });


  }



} 


export function loadExtraImagesOnLoad() {
  

  return (dispatch,state,sdk) => {

    sdk.currentUser.show().then((res) => {
      console.log(res.data);
      const user = res.data.data;

      const extraImages = user.attributes.profile.protectedData.extra_images;
      let finalArray = [];


      for(const image in extraImages) {
        finalArray.push({                    
          file: extraImages[image],
          id: image,
          index:image,
          imageId:image
      })

      }

      return dispatch(loadExtraImages(finalArray));

    })


  }


}



export function chargeStripeCardOnToken(params) {


  const {token, values} = params;

  

  return (dispatch,state,sdk) => {
    //extract current user from state
    //  const {user} = 


    // Dispatch to change state to request is being processed
    dispatch(chargeStripeRequest());

    const user = state().user.currentUser.attributes.profile;

    const protectedData = user.protectedData;

    const getstate = state();
    // will check if the user is already purchased a member plan.


    chargeStripePayment(params)
    
    .then((response) => {
        // response contains 
        // {
          
        //   success:true,
        //   paymentDetails:{
        //       trxID:charge.id,
        //       amount:membershipFee
        //   }
        // }
        // 


        const date = new Date();
        const currentTimestamp = date.getTime();


        // save payment info to user profile
        sdk.currentUser.updateProfile({

          protectedData: {
            membershipInfo: {
              ...response,
              registrationTime:currentTimestamp
            }
          }

        })

        .then((res) => {
          console.log(res);
          dispatch(changePaymentPopup(!getstate.ProfileSettingsPage.paymentPopupOpened));
          dispatch(chargeStripeSuccess());
          
          // reloading page
          setTimeout(() => {
            window.location.reload()
          },2000)
          

        })

    })
    .catch((error) => {
    
      console.error('API CALL FAILED', error);
    
    })



     // Make API call to server with token and values

     // On successful REsponse, save TRX token for user protectedData
      //  in following format

      // {
      //     paymentDone: true,
      //     paymentDetails:{ 
      //       paymentDate:'',
      //       paymentTime:'',
      //       paymentAmount:'',
      //     }
      // }


      // once saved, dispatch success action

  }

}


export function togglePaymentPopup() {

  return (dispatch,getState,sdk) =>  {
    const state = getState();

    dispatch(changePaymentPopup(!state.ProfileSettingsPage.paymentPopupOpened));


  }
    

}