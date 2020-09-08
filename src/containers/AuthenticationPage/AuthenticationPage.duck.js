import axios from 'axios';




// <========== CONFIGURATIONS ==========>

const requestAction = actionType => params => ({ type: actionType, payload: { params } });

const successAction = actionType => result => ({ type: actionType, payload: result.data });

const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });




// <========== ACTION TYPES ==========>
export const PROFILE_EXTRA_IMG = 'user/signupform/PROFILE_EXTRA_IMG';




// <========== REDUCERS ==========>

const initialState = {
    images: null,
    isUploading:null,
}

export function reducer(state=initialState, action={}) {

    switch(action.type) {
        case PROFILE_EXTRA_IMG:



        default:
            return state;



    }



}





// <========== Action Creators ==========>


export function requestImageUpload(data) {

    return (dispatch,getState,sdk) => {
        console.log(data);

        return sdk.listings.query({})
        .then(resp => console.log(resp.data));

        // return sdk.images.upload({
        //     image:data.file
        // })
        // .then((resp) => {
        //     console.log('success',resp);
        // })
        // .catch((err) => {
        //     console.log('Error',err);
        // })


    }



}


