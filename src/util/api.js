import { types as sdkTypes, transit } from './sdkLoader';
import config from '../config';
import Decimal from 'decimal.js';

const apiBaseUrl = () => {
  const port = process.env.REACT_APP_DEV_API_SERVER_PORT;
  const useDevApiServer = process.env.NODE_ENV === 'development' && !!port;

  // In development, the dev API server is running in a different port
  if (useDevApiServer) {
    return `http://localhost:${port}`;
  }

  // Otherwise, use the same domain and port as the frontend
  return `${window.location.origin}`;
};

// Application type handlers for JS SDK.
//
// NOTE: keep in sync with `typeHandlers` in `server/api-util/sdk.js`
export const typeHandlers = [
  // Use Decimal type instead of SDK's BigDecimal.
  {
    type: sdkTypes.BigDecimal,
    customType: Decimal,
    writer: v => new sdkTypes.BigDecimal(v.toString()),
    reader: v => new Decimal(v.value),
  },
];

const serialize = data => {
  return transit.write(data, { typeHandlers, verbose: config.sdk.transitVerbose });
};

const deserialize = str => {
  return transit.read(str, { typeHandlers });
};

const post = (path, body) => {
  const url = `${apiBaseUrl()}${path}`;
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/transit+json',
    },
    body: serialize(body),
  };
  return window
    .fetch(url, options)
    .then(res => {
      if (res.status >= 400) {
        const e = new Error('Local API request failed');
        e.apiResponse = res;
        throw e;
      }
      return res;
    })
    .then(res => {
      const contentTypeHeader = res.headers.get('Content-Type');
      const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : null;
      if (contentType === 'application/transit+json') {
        return res.text().then(deserialize);
      } else if (contentType === 'application/json') {
        return res.json();
      }
      return res.text();
    });
};

// Fetch transaction line items from the local API endpoint.
//
// See `server/api/transaction-line-items.js` to see what data should
// be sent in the body.
export const transactionLineItems = body => {
  return post('/api/transaction-line-items', body);
};

// Initiate a privileged transaction.
//
// With privileged transitions, the transactions need to be created
// from the backend. This endpoint enables sending the booking data to
// the local backend, and passing that to the Marketplace API.
//
// See `server/api/initiate-privileged.js` to see what data should be
// sent in the body.
export const initiatePrivileged = body => {
  return post('/api/initiate-privileged', body);
};

// Transition a transaction with a privileged transition.
//
// This is similar to the `initiatePrivileged` above. It will use the
// backend for the transition. The backend endpoint will add the
// payment line items to the transition params.
//
// See `server/api/transition-privileged.js` to see what data should
// be sent in the body.
export const transitionPrivileged = body => {
  return post('/api/transition-privileged', body);
};




//  File level functions to upload images:

export const uploadImagesToStorage = (fileObj,cb) => {
  const {file} = fileObj;

  
  const url = `${apiBaseUrl()}/files/uploadFile`;
  fetch(url, {
    method:'POST',
    body:file

  }).then((res) => {
    

    const responseJSON = res.json();
    
    return responseJSON;  
  
  }).then((res) => {  
    
    res.image_url = `${res.image_url}`

    cb(null,res);
  })
  
  .catch((err) => {
    cb(err,null);
  })

}


export const chargeStripePayment = function(params) {

  const url = `${apiBaseUrl()}/customStripecharges/chargePayment`;
  
  return new Promise((resolve, reject) => {
    let stringParams = JSON.stringify(params);

    fetch(url,{
      method:'POST',
      body: stringParams,
      headers:{
        'Content-type':'application/json'
      }
    })  

    .then((res) => res.json())

    .then(response => {

      if(response.success) {
        resolve(response);
      } else {
        reject(response);
      }

    })

    .catch((err) => {

      reject({...err,success:false});

    })


  });


}



export const getSectionsDataFromServer = () => {
  const url = `${apiBaseUrl()}/system-api/updateSections`;


  return new Promise((resolve, reject) => {

    fetch(url,{
      method:'GET',
      headers:{
        'Content-type':'application/json'
      }
    })  

    .then((res) => res.json())

    .then(response => {

    
      resolve({...response,success:true});

    })

    .catch((err) => {

      reject({...err,success:false});

    });


  });


}


export const saveSectionDataOnServer = (data) => {
  const url = `${apiBaseUrl()}/system-api/updateSections`;


  return new Promise((resolve, reject) => {

    
      fetch(url,{
        method:'POST',
        body:JSON.stringify({sections:data}),
        headers: {
          'Content-type':'application/json'
        }
      })
      
      .then(res => res.json())

      .then((response) => {
        
        if(response.success) {
          resolve(response);
          return;
        } else {
          reject(response);
          return;
        }
      

      })

  })


}




export const getAdminEmail = () => {
  const url = `${apiBaseUrl()}/system-api/setting`;

  return new Promise((resolve, reject) => {

    console.log('Calling out data');
    fetch(url,{
      method:"POST",
      body: JSON.stringify({"key":"admin_email"}),
      headers: {
        'Content-type':'application/json'
      }
    })
    
    .then((res) => res.json())

    .then((response) => {

      if(response.success) {
        resolve(response);
      } else {

        reject(response)
      }

    })

    .catch(err => {
      reject(err);
    })

  })


}