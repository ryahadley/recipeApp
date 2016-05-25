angular.module('recipeApp').controller('collectionCtrl', function($scope, collectionServ, recipeServ, $state) {

  // recipe displays

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
    console.log('0', list, num);
    recipeServ.changeServings(list, num);
    console.log('1', list, num);
    $scope.showServings();
  }

  $scope.searches = function(searchTerm) {
    recipeServ.searchQuery(searchTerm)
    .then(function(response) {
      return response;
    })
  }

  // creating new recipes

    $scope.addNewRecipe = function(recipe) {
      console.log("oh", recipe);
      var username = $scope.user.data.username;
      recipe.publisher = username;

      if(!recipe.image_url) {
        var rand = Math.floor(Math.random() * 7);
        var pic = ['../../styles/img/martha.jpg', '../../styles/img/martha.jpg', '../../styles/img/martha1.jpg', '../../styles/img/martha2.jpg',
        '../../styles/img/martha3.png', '../../styles/img/martha4.jpg', '../../styles/img/martha5.jpg'];

        recipe.image_url = pic[rand];
      }

      $('.signUpForm').trigger("reset");
      collectionServ.addOwnRecipes(recipe)
      .then(function(response) {
        console.log('hey', response);
        $state.reload();
        return response;
      })
    }

    $scope.deleteYourRecipe = function(recipeId) {
      collectionServ.deleteOwnRecipe(recipeId)
      .then(function(response) {

        $state.reload();
      })
    }

    $scope.showUserRecipes = function() {
      collectionServ.userRecipes()
      .then(function(response) {

        $scope.userRecipes = response.favorites;
      })
    }
    $scope.showUserRecipes();

    $scope.userMadeRecipes = function() {
      collectionServ.madeByUser()
      .then(function(response) {
        console.log('my recipes', response);
        $scope.ownRecipies = response.data;
      })
    }
    $scope.userMadeRecipes();

    $scope.goMakeThem = function() {
      $state.go('ideas');
    }

})
