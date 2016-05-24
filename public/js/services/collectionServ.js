angular.module('recipeApp').service('collectionServ', function($http) {

  this.addOwnRecipes = function(recipe) {

    return $http ({
      method: 'POST',
      url: '/api/make',
      data: {
        title: recipe.title,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        image_url: recipe.image_url,
        publisher: recipe.publisher,
        social_rank: recipe.social_rank
      }
    })
  }

  this.deleteOwnRecipe = function(recipeId) {
    return $http ({
      method: 'DELETE',
      url: '/api/recipes/' + recipeId
    })
  }

  this.userRecipes = function() {
    return $http({
      method: 'GET',
      url: '/api/allrecipes'
    }).then(function(response) {

      return response.data;
    })
  }

  this.madeByUser = function() {
    return $http({
      method: 'GET',
      url: '/api/yourRecipes'
    }).then(function(response) {

      return response;
    })
  }

})
