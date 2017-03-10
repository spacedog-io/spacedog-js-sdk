
export default {
  
  all: ['create',
       'read',
       'read_all',
       'search',
       'update',
       'update_all',
       'delete',
       'delete_all'],

  default_admin: ['create', 'search', 'update_all', 'delete_all'],

  default_user: ['create', 'search', 'update', 'delete'],

  default_key: ['read_all'],

}