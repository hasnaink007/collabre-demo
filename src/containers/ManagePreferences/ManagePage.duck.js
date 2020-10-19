import { 
    getSectionsDataFromServer,
    saveSectionDataOnServer,
    uploadImagesToStorage
} from '../../util/api';





const SAVE_SECTIONS_DATA_REQUEST = '/app/ManagePage/SAVE_SECTIONS_DATA_REQUEST';
const SAVE_SECTIONS_DATA_SUCCESS = '/app/ManagePage/SAVE_SECTIONS_DATA_SUCCESS';
const SAVE_SECTIONS_DATA_ERROR = '/app/ManagePage/SAVE_SECTIONS_DATA_ERROR';


const LOAD_INITIAL_DATA_REQUEST = '/app/ManagePage/LOAD_INITIAL_DATA_REQUEST';
const LOAD_INITIAL_DATA_SUCCESS = '/app/ManagePage/LOAD_INITIAL_DATA_SUCCESS';
const LOAD_INITIAL_DATA_ERROR = '/app/ManagePage/LOAD_INITIAL_DATA_ERROR';



const UPLOAD_IMAGE_REQUEST = '/app/ManagePage/UPLOAD_IMAGE_REQUEST';
const UPLOAD_IMAGE_SUCCESS = '/app/ManagePage/UPLOAD_IMAGE_SUCCESS';
const UPLOAD_IMAGE_ERROR = '/app/ManagePage/UPLOAD_IMAGE_ERROR';




const initialState = {
    sections: [],
    saveInProgress:false,
    fetchInProgress:false,
    uploadedImages: {}

}


/* ============== MAIN REDUCER =============== */ 

const managePageReducer = (state = initialState , action = {}) => {

    const {payload,type} = action;

    let newObj = {};

    switch (type) {
        case SAVE_SECTIONS_DATA_REQUEST:
        
        case SAVE_SECTIONS_DATA_SUCCESS:

        case SAVE_SECTIONS_DATA_ERROR:

        case LOAD_INITIAL_DATA_REQUEST:
            return {...state,...payload}

        case LOAD_INITIAL_DATA_SUCCESS:
            return {...state,...payload}

        case LOAD_INITIAL_DATA_ERROR:
            return {...state,...payload}

        case UPLOAD_IMAGE_REQUEST:
            
            newObj = {uploadedImages: {...state.uploadedImages,...payload}};
            // console.log(newObj);
            return {...state,...newObj};

        case UPLOAD_IMAGE_SUCCESS:
            newObj = {uploadedImages: {...state.uploadedImages,...payload}};
            // console.log(newObj);
            return {...state,...newObj};

        default:
            return state;
    }

}

export default managePageReducer;



/* ============== Action Creators =============== */ 

export const sendSaveSectionsRequest = () => {
    return {
        type:SAVE_SECTIONS_DATA_REQUEST,
        payload:{saveInProgress:true}
    }

}


export const sendSaveSectionsSuccess = payload => {
    return {
        type:SAVE_SECTIONS_DATA_SUCCESS,
        payload:{saveInProgress:false}
    }
}


export const sendSaveSectionsError = (payload = {}) => {
    return {
        type:SAVE_SECTIONS_DATA_ERROR,
        payload:{saveInProgress:false}
    }
}


export const loadInitialDataRequest = () => {
    return {
        type:LOAD_INITIAL_DATA_REQUEST,
        payload: {fetchInProgress:true}
    }
}


export const loadInitialDataSuccess = (payload) => {
    return {
        type:LOAD_INITIAL_DATA_SUCCESS,
        payload: {sections:payload[0].sections, success:payload.success , fetchInProgress:false}
    }

}


export const loadInitialDataError = (payload) => {

    return {
        type:LOAD_INITIAL_DATA_ERROR,
        payload: {fetchInProgress:false,success:false}
    }

}





export const ImageUploadingRequest = (payload) => {

    const uploadState = {[payload.index] : 'uploading'};

    return {
        type: UPLOAD_IMAGE_REQUEST,
        payload: uploadState
    }

}



export const ImageUploadingSuccess = (payload) => {

    const uploadState = {[payload.index] : payload.url} 
    return {
        type: UPLOAD_IMAGE_SUCCESS,
        payload: uploadState
    }

}



export const ImageUploadingError = (payload) => {
    throw new Error(payload);
    return {
        type: UPLOAD_IMAGE_ERROR,
        payload: {}
    }

}



/* ============== Thunks =============== */ 



export const getSectionsData = () => {
    return (dispatch, getState, sdk) => {
        dispatch(loadInitialDataRequest());

        getSectionsDataFromServer().then((response) => {

            dispatch(loadInitialDataSuccess(response));

        }).catch(err => {
            loadInitialDataError(err);
        })

        

    }
}



export const updateSectionsData = (sectionData) => {
    return (dispatch,getState,sdk) => {
        dispatch(sendSaveSectionsRequest());
    
        saveSectionDataOnServer(sectionData).then((response) => {

            dispatch(sendSaveSectionsSuccess(response));
            
            // recalling to load initial data again.
            // dispatch(loadInitialDataSuccess(response));

            dispatch(getSectionsData());

        }).catch(response => {
            dispatch(sendSaveSectionsError(response));
        });
        
        return;
    }
    
}   


export const uploadImageToServer = (data) => {

    console.log('Called Component');
    return (dispatch,getState,sdk) => {

        const {id, file, index} = data;

        dispatch(ImageUploadingRequest(data));

        // const form_data = new FormData();
        // // console.log(actionPayload);
        // form_data.append('extraImage',actionPayload.file);
        // form_data.append('fileId',actionPayload.id);
    
        // // debugger;
    
        // uploadImagesToStorage({
        //   file:form_data,
        //   fileID:actionPayload.id,
        //   fieldIndex:actionPayload.index
        // }

        const formData = new FormData();

        formData.append('fileId',id);
        formData.append('extraImage',file);




        uploadImagesToStorage({
            file:formData,
            fileID:id,
            fieldIndex:index
        }, (err,res) => {
            if(err) { dispatch(ImageUploadingError(err)); return; }

            // console.log(res);
            dispatch(ImageUploadingSuccess({
                index: index,
                url: res.image_url
            }));



        })

    }

}