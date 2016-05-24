angular.module('recipeApp', ['ui.router', "ui.bootstrap.modal"])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: '/js/views/home.html',
      controller: function($scope) {
        $(document).ready(function() {
          $('main').removeClass('blur');
          $('container').removeClass('black');
          $('.pagebar').css('opacity', '0');
          $('.pagebar2').css('opacity', '0');
          $('.pagebar3').css('opacity', '0');
          $('.pagebar4').css('opacity', '0');
        })

        $scope.$parent.apiRecipes = null;
      }
    })

    .state('search', {
      url: '/search',
      templateUrl: '/js/views/search.html',
      controller: function($scope) {
        $(document).ready(function() {
          $('main').removeClass('blur');
          $('container').removeClass('black');
          $('.pagebar3').css('opacity', '1');

          $('.pagebar').css('opacity', '0');
          $('.pagebar2').css('opacity', '0');
          $('.pagebar4').css('opacity', '0');
        })
      }
    })

    .state('recipes', {
      url: '/recipes',
      templateUrl: '/js/views/recipes.html',
      controller: function($scope) {
        $(document).ready(function() {
          $('main').removeClass('blur');
          $('container').removeClass('black');
          $('.pagebar2').css('opacity', '1');

          $('.pagebar').css('opacity', '0');
          $('.pagebar3').css('opacity', '0');
          $('.pagebar4').css('opacity', '0');
        })

        $scope.$parent.apiRecipes = null;
      }
    })

    .state('ideas', {
      url: '/ideas',
      templateUrl: '/js/views/ideas.html',
      controller: function($scope) {
        $(document).ready(function() {
          $('main').removeClass('blur');
          $('container').removeClass('black');
          $('.pagebar').css('opacity', '1');

          $('.pagebar3').css('opacity', '0');
          $('.pagebar2').css('opacity', '0');
          $('.pagebar4').css('opacity', '0');
        })

        $scope.$parent.apiRecipes = null;

      }
    })

    .state('signIn', {
      url: '/signIn',
      templateUrl: '/js/views/signin.html',
      controller: function($scope) {
        // $('main').hide();

        $(document).ready(function() {
          $('main').addClass('blur');
          $('container').addClass('black');

          $('.pagebar4').css('opacity', '1');

          $('.pagebar').css('opacity', '0');
          $('.pagebar2').css('opacity', '0');
          $('.pagebar3').css('opacity', '0');
        })

        $scope.$parent.apiRecipes = null;
      }
    })

});
