import axios from 'axios'
import api from './api'
import Config from '../common/Config'

var CategoryService = {

    getCategoryList(query, success, fail) {
        api.shared().get('/admin/category/list',
            {

            })
            .then(function (response) {
                success(response.data);
            })
            .catch(function (error) {
                console.log(error.response)
                fail(error.response);
            });
    },

    deleteCategory(id, success, fail) {
        console.log(id)
        axios({
            url: Config.BACKEND_API_URL+'/admin/category/delete',
            method: 'delete',
            data: {
              'categoryId': id
            },
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function (response) {
            success(response.data);
          })
          .catch(function (error) {
            console.log(error.response)
            fail(error.response.data);
           });

        // api.shared().delete('/category',
        // {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: {
        //       categoryId: id
        //     }
        // })
        // .then(function (response) {
        //     success(response.data);
        // })
        // .catch(function (error) {
        //     console.log(error.response)
        //     fail(error.response.data);
        // });
    },

    createCategory(category, success, fail) {
        api.shared().post('/admin/category/create',
            {
                categoryname: category.categoryname,
                createdby: category.createdby,
                createdtime: category.createdtime
            })
            .then(function (response) {
                success(response.data);
            })
            .catch(function (error) {
                console.log(error.response)
                fail(error.response.data);
            });
    }
}

export default CategoryService;
