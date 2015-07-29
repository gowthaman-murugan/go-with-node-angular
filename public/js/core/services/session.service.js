'use strict';

app.factory('Session', function ($resource) {
    return $resource('/api/auth/session/');
  });
