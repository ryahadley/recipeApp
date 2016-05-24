angular.module('recipeApp').controller('recipeCtrl', function($scope, recipeServ) {

    $scope.servingsShown = false;
    $scope.addShown = true;
    $scope.custom = false;
    $scope.pleasework = true;

    $scope.addCustom = function() {
      $scope.custom = !$scope.custom;
      $scope.pleasework = !$scope.pleasework;
    }

    $scope.showServings = function() {
      $scope.servingsShown = !$scope.servingsShown;
      $scope.addShown = !$scope.addShown;
      $scope.custom = false;
      $scope.pleasework = true;
    }

    $scope.searchIngredient = function(recipe) {
      $scope.title = recipe.title;
      $scope.recipeImage = recipe.image_url;
      $scope.recipeSource = recipe.source_url;
      $scope.ranking = recipe.social_rank;
      $scope.publisher = recipe.publisher;
      $scope.recipeId = recipe.recipe_id;
      var recipeId = recipe.recipe_id;

      $scope.servingsShown = false;

      recipeServ.getIngredients(recipeId).then(function(response) {
        console.log("ingredients: ", response.data.recipe.ingredients);
          var list = response.data.recipe.ingredients;

          $scope.list = list;

          $('.recipeDescription').append('<ul class="ingList">');
          $(list).each(function(index, item) {
              $('.ingList').append(
                  $(document.createElement('li')).text(item)
              );
            })
      })

    };

    $scope.multiplyServings = function(list, num) {
      recipeServ.changeServings(list, num);
      $scope.showServings();
    }

    $scope.searches = function(searchTerm) {
      recipeServ.searchQuery(searchTerm)
      .then(function(response) {
        return response;
      })
    }

});
