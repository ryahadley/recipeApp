angular.module('recipeApp').service('ideasServ', function($http) {

  this.fridgeAdd = function(item) {

    return $http({
      method: 'PUT',
      url: '/api/user/addFridge',
      data: {item}
    }).then(function(response) {

      return response;
    })
  };

  this.fridgeRemove = function(item) {
    return $http({
      method: 'PUT',
      url: '/api/user/removeFridge',
      data: {item}
    }).then(function(response) {

      return response;
    })
  };

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/api/me'
    }).then(function(response) {

      return response;
    })
  };

  this.getPopularSearches = function() {
    return $http({
      method: 'GET',
      url: '/api/searches'
    }).then(function(response) {
  
      return response;
    })
  }

});
