import axios from 'axios'
import api from './api'
import Config from '../common/Config'

var UserService = {
  createUser(user, success, fail) {
    api.shared().post('/admin/user/create', {
      userId: user.userId,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      company: user.company,
      country: user.country,
      state: user.state,
      city: user.city,
      address: user.address,
      pincode: user.pincode,
      mobilenumber: user.mobileNumber,
      userrole: user.userrole
    }).then(function (response) {
      success(response.data);
    }).catch(function (error) {
      console.log(error.response)
      fail(error.response.data);
    });
  },
  getUser(user, success, fail) {
    api.shared().get('/user', {
      email: user.email
    }).then(function (response) {
      success(response.data);
    }).catch(function (error) {
      console.log(error.response);
      fail(error.response);
    });
  }
}

export default UserService;
