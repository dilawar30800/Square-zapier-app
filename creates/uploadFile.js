const request = require('request');
const FormData = require('form-data');
var fs = require('fs');

var r = Math.random().toString(36).substring(7);

const hydrators = require('../hydrators');

const uploadFile = (z, bundle) => {
  const formData = new FormData();
  var obj={
  "idempotency_key": "78a2ad01-0319-469f-b176-1f26a6"+r,
    "image": {
    "id": "#"+bundle.inputData.id,
    "type": "IMAGE",
    "image_data": {
    "caption": bundle.inputData.caption,
    "name": bundle.inputData.name  }
    }
  };
  // file will in fact be an url where the file data can be downloaded from
  // which we do via a stream created by NPM's request package
  // (form-data doesn't play nicely with z.request)
  //formData.append('file', request(bundle.inputData.file));
  
  formData.append('file', request('http://nodejs.org/images/logo.png'));
  formData.append('request',JSON.stringify({
"idempotency_key": "78a2asdsd-0319-469f-b176-1fsd6a65899d1",
"image": {
"id": "#23sd42346",
"type": "IMAGE",
"image_data": {
"caption": "this is the caption",
"name": "this is the name"
}
}
}));

  return z.request({
      url: "https://connect.squareupsandbox.com/v2/catalog/images",
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'client_id':bundle.authData.client_id,
      'Accept':'application/json',
      'Authorization': 'Bearer ' + bundle.authData.access_token,
      // 'Authorization': "Bearer EAAAECw5Su2DtbF-wFVt4aPSNb_-8jyDcoZHiYeCT5ix-Vw3wykF_54Ir5kIJdht"
    },
    params: {
      'client_id':bundle.authData.client_id
    },
      body: formData,
    })
    .then((response) => {
      console.log(response);
      const file = response.json;

      // Make it possible to use the actual uploaded (or online converted)
      // file in a subsequent action. No need to download it now, so again
      // dehydrating like in ../triggers/newFile.js
     return file;
    });
};

module.exports = {
  key: 'uploadFile',
  noun: 'File',
  display: {
    label: 'Upload File',
    description: 'Uploads a file.'
  },
  operation: {
    inputFields: [
        {key: 'id', required: true, type: 'string', label: 'Image Id'},
        {key: 'name', required: true, type: 'string', label: 'Name'},
        {key: 'caption', required: true, type: 'string', label: 'Caption'},
        {key: 'file', required: true, type: 'file', label: 'File'},
    ],
    perform: uploadFile,
    sample: {   "image": {
        "type": "IMAGE",
        "id": "OYMCM6GYECVLMMMBFT4RTREW",
        "updated_at": "2020-07-07T04:15:31.95Z",
        "version": 1594095331950,
        "is_deleted": false,
        "present_at_all_locations": true,
        "image_data": {
            "name": "this is the name",
            "url": "https://square-catalog-sandbox.s3.amazonaws.com/files/0471334722302f160ea672d77ee8bcbda1167fc1/original.jpeg",
            "caption": "this is the caption"
        }
    }
},
    outputFields: [
      {key: 'id', type: 'string', label: 'ID'},
      {key: 'name', type: 'string', label: 'Name'},
      {key: 'caption', type: 'string', label: 'Caption'},
      {key: 'url', type: 'string', label: 'URL'},
    ],
  }
};
