'use strict';

app.factory('User', function ($resource) {
    return $resource('/api/auth/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
