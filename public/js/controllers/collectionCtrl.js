angular.module('recipeApp').controller('collectionCtrl', function($scope, collectionServ, $state) {

    $scope.addNewRecipe = function(recipe) {
      console.log("oh", recipe);
      var username = $scope.user.data.username;
      recipe.publisher = username;

      if(!recipe.image_url) {
        var rand = Math.floor(Math.random() * 7);
        var pic = ['../../styles/img/martha.jpg', '../../styles/img/martha.jpg', '../../styles/img/martha1.jpg', '../../styles/img/martha2.jpg',
        '../../styles/img/martha3.jpg', '../../styles/img/martha4.jpg', '../../styles/img/martha5.jpg'];

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
