import axios from 'axios'
import api from './api'
import Config from '../common/Config'

var UploadService = {
    uploadFile(ext, data, success, fail) {
        axios({
            url: Config.BACKEND_API_URL+'/upload?ext='+ext,
            method: 'put',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: data
          })
          .then(function(response) {
             success(response.data);
          })
          .catch(function(error) {
            console.log(error.response)
            if (error.response != undefined) {
                fail(error.response.data);
            }
        });

        // api.shared().put('/upload/ext='+ext,
        //         data, {
        //             headers: { 'Content-Type': 'multipart/form-data' }
        //         })
        //     .then(function(response) {
        //         success(response.data);
        //     })
        //     .catch(function(error) {
        //         console.log(error.response)
        //         if (error.response != undefined) {
        //             fail(error.response.data);
        //         }
        //     });

        // api.setJSONRequest();
    },
}

export default UploadService;
