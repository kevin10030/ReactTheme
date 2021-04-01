import React from 'react';

const Categories  = React.lazy(() => import('./modules/courses/Categories'));
const Courses  = React.lazy(() => import('./modules/courses/Courses'));
const Sections  = React.lazy(() => import('./modules/courses/Sections'));
const Topics  = React.lazy(() => import('./modules/courses/Topics'));
const Orders = React.lazy(() => import('./modules/courses/Orders'));

const Payments = React.lazy(() => import('./modules/courses/Payments'));
const Refund = React.lazy(() => import('./modules/courses/RefundPage'));
const Messages = React.lazy(() => import('./modules/users/Messages'));
const Users = React.lazy(() => import('./modules/users/Users'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/modules/admin', exact: true, name: 'Admin', component: Categories},
  { path: '/modules/admin/categories', exact: true, name: 'Categories', component: Categories },
  { path: '/modules/admin/courses', exact: true, name: 'Courses', component: Courses },
  { path: '/modules/admin/courses/:id', exact: true, name: 'Sections', component: Sections },
  { path: '/modules/admin/courses/:id/:id', name: 'Topics', component: Topics },

  { path: '/modules/admin/orders', name: 'Orders', component: Orders },  
  { path: '/modules/admin/payments', name: 'Payments', component: Payments },
  { path: '/modules/admin/refund', name: 'Refund', component: Refund },
  { path: '/modules/admin/messages', name: 'Messages', component: Messages },
  { path: '/modules/admin/users', name: 'Users', component: Users },

];

export default routes;
