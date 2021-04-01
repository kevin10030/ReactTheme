export default [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Course Management']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Categories',
    to: '/modules/admin/categories',
    icon: 'cil-list-filter',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Courses',
    to: '/modules/admin/courses',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    to: '/modules/admin/orders',
    icon: 'cil-bookmark',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Payments',
    to: '/modules/admin/payments',
    icon: 'cil-bank',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Refund',
    to: '/modules/admin/refund',
    icon: 'cil-money',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['User Management']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/modules/admin/users',
    icon: 'cil-people'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Messages',
    to: '/modules/admin/messages',
    icon: 'cil-speech'
  },
]
