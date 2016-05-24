angular.module('recipeApp').service('mainServ', function($http) {

    this.getRecipe = function (){
      return $http ({
        method: 'GET',
        url: '/api/recipes'
      }).then(function(response){
        return response;
      });
    }

    this.addRecipe = function(recipe) {
      return $http({
        method: 'POST',
        url: '/api/recipes',
        data: {
          id: recipe._id,
        }
      }).then(function(response) {
      })
    }

    this.changeRecipe = function(id, newRecipe) {
      return $http({
        method: "PUT",
        url: '/api/recipes/' + id,
        data: newRecipe
      }).then(function(response) {
    
      })
    }

    this.deleteRecipe = function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/recipes/' + id
      }).then(function(response) {

      })
    }

    this.addUser = function(newUser) {
      return $http({
        method: "POST",
        url: '/api/user',
        data: newUser
      }).then(function(response) {

      })
    }

    this.getUser = function() {
      return $http({
        method: 'GET',
        url: '/api/me'
      }).then(function(response) {

        return response;
      });
    };

    this.register = function(user) {
      return $http({
        method: 'POST',
        url: '/api/user',
        data: user
      }).then(function(response) {

        return response;
      });
    };

    this.login = function(info) {
        return $http({
          method: 'POST',
          url: '/api/login',
          data: info
        }).then(function(response) {
          return response;
        });
      };

    this.logout = function() {
      return $http({
        method: 'GET',
        url: '/api/logout',
      }).then(function(response) {
        return response;
      });
    };

    this.addToFavorites = function(recipeId) {
      return $http({
        method: "POST",
        url: "/api/user/addtofavorites/" + recipeId
      }).then(function(response) {

        return response.data;
      })
    }

    this.removeFromFavorites = function(recipeId) {
      return $http({
        method: "PUT",
        url: "/api/user/removefromfavorites/" + recipeId
      }).then(function(response) {

        return response.data;
      })
    }

    this.facebookLogin = function() {
      return $http({
        method: "GET",
        url: '/auth/facebook'
      }).then(function(response) {
        return response;

      })
    }

});
