angular.module('recipeApp')
.directive('modalLogin', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    templateUrl: "/js/views/modals.html"
  };
})
.directive('searchBar', function() {
  return {
    restrict: 'E,A',
    scope: {
      search: '&'
    },
    templateUrl: '/js/views/searchbar.html',
    controller: function($scope, recipeServ, $state) {
      $scope.showfood = function(ingredient) {
        recipeServ.getApiRecipe(ingredient).then(function(response) {

        $scope.$parent.apiRecipes = response.data.recipes;

        $state.go('search');

        if(response.data.count == 0) {
          // $('#searchBy').css('display': 'none');
          $('.recipesContainer').append('<div class="sorry">');
          $('.sorry').append($(document.createElement('div')).text("could not find anything"));
          return;
        }
        else {
          // $('#searchBy').css('display': 'flex');
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
        }, 200);
        $scope.ingredient = "";
      })
      }

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

    }
  }
})
.directive('flickity', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/views/flickity.html'
  }
})
.directive('header', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/views/header.html'
  }
})
