import axios from 'axios'
import api from './api'
import Config from '../common/Config'

var CourseService = {

    getCourseList(query, success, fail) {
        api.shared().get('/admin/course/list',
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

    deleteCourse(id, success, fail) {
        console.log(id)
        axios({
            url: Config.BACKEND_API_URL+'/admin/course/delete',
            method: 'delete',
            data: {
              'courseId': id
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
    },



    createCourse(course, success, fail) {
        api.shared().post('/admin/course/create',
            {
                title: course.title,
                description:course.description ,
                category: course.category,
                level: course.level,
                imageFile: course.imageFile,
                videoFile: course.videoFile
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

export default CourseService;
