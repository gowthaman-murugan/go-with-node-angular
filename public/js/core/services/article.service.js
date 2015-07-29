'use strict';

app.factory('Article', function($resource) {
    return $resource('/api/articles/:id/', {
        id: '@_id'
    }, {
        'update': {
            method: 'PUT'
        }
    });
});
