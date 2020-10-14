import { 
    getSectionsDataFromServer,
    saveSectionDataOnServer
} from '../../util/api';





const SAVE_SECTIONS_DATA_REQUEST = '/app/ManagePage/SAVE_SECTIONS_DATA_REQUEST';
const SAVE_SECTIONS_DATA_SUCCESS = '/app/ManagePage/SAVE_SECTIONS_DATA_SUCCESS';
const SAVE_SECTIONS_DATA_ERROR = '/app/ManagePage/SAVE_SECTIONS_DATA_ERROR';


const LOAD_INITIAL_DATA_REQUEST = '/app/ManagePage/LOAD_INITIAL_DATA_REQUEST';
const LOAD_INITIAL_DATA_SUCCESS = '/app/ManagePage/LOAD_INITIAL_DATA_SUCCESS';
const LOAD_INITIAL_DATA_ERROR = '/app/ManagePage/LOAD_INITIAL_DATA_ERROR';


const initialState = {
    sections: [],
    saveInProgress:false,
    fetchInProgress:false,
}


/* ============== MAIN REDUCER =============== */ 

const managePageReducer = (state = initialState , action = {}) => {

    const {payload,type} = action;


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