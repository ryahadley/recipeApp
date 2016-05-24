angular.module('recipeApp').controller('ideasCtrl', function($scope, $compile, $state, ideasServ, recipeServ) {

  $scope.fridgeShown = true;
  $scope.ingredientsShown = false;
  $scope.storesShown = false;

  $scope.tabShow = function() {
    $scope.storesShown = false;
    $scope.ingredientsShown = false;
    $scope.fridgeShown = true;
  };

  $scope.tabShow2 = function() {
    $scope.fridgeShown = false;
    $scope.ingredientsShown = true;
    $scope.storesShown = false;
  };

  $scope.tabShow3 = function() {
    $scope.fridgeShown = false;
    $scope.storesShown = true;
    $scope.ingredientsShown = false;
  };

  $scope.addOne = function() {

    var html = "<div class='addToFridge'><input class='added' type='text' placeholder='Add To Fridge'><div class='icons'><img ng-click='addOne()' class='plus' src='../../styles/img/pluss.png'><img ng-click='minusOne()' class='minus' src='../../styles/img/minus.png'></div></div>";

    angular.element(document.getElementsByClassName('fridge'))
    .append($compile(html)($scope));
  };

  $scope.addFridge = function(item) {
    if(item) {
      $scope.item = "";
      ideasServ.fridgeAdd(item)
      .then(function(response) {
        console.log("huh", response);
        ideasServ.getUser()
        .then(function(response) {
          console.log(response);
          $scope.foods = response.data.inFridge;
        })
      })
    }
    else {
      console.log('nothing to add');
    }
  }

  $scope.call = function() {
    ideasServ.getUser()
    .then(function(response) {

      $scope.foods = response.data.inFridge;
    })
  }
  $scope.call();

  $scope.minusOne = function() {
    $('.minus').on('click', function() {
      $(this).parent().parent().remove();
    });
  }

  $scope.removeFridge = function(item) {
    if(item) {
      ideasServ.fridgeRemove(item)
      .then(function(response) {
        console.log(response);
        ideasServ.getUser()
        .then(function(response) {
          $scope.foods = response.data.inFridge;
        })
      })
    }
    else {
      console.log('nothing to delete');
    }
  }

  $(document).ready(function() {
    $('.pageTag').on('click', function() {
      $('.onPageBar').css('height', '1px');
      $(this).next().css('height', '5px');
    })
  })

  $scope.popularSearches = function() {
    ideasServ.getPopularSearches().
    then(function(response) {

      $scope.Searches = response.data;
    })
  }
  $scope.popularSearches();

  $scope.showfood = function(ingredient) {
    recipeServ.getApiRecipe(ingredient).then(function(response) {

    $scope.$parent.apiRecipes = response.data.recipes;

    $state.go('search');

    if(response.data.count == 0) {
      $('.recipesContainer').append('<div class="sorry">');
      $('.sorry').append($(document.createElement('div')).text("could not find anything"));
    }
    else {
      $('.sorry').empty();
    }

    return response.data.recipes;

  })
  .then(function(response) {

    var length = response.length - 1;
    var i = 0;

    var addedRecipe = setInterval(function() {

      if(i == length) {
        clearInterval(addedRecipe);
      }
      else {
      recipeServ.addRecipe(response[i])
      .then(function(response2) {

      })

      i++;
      }
    }, 2000);
    $scope.ingredient = "";
  })
  }




});
