angular.module('recipeApp').controller('mainCtrl', function($scope, mainServ, recipeServ, $state) {

    $scope.apiRecipes;

    $scope.login = function(userInfo) {
      if(userInfo) {
      mainServ.login(userInfo).then(function(response) {
      }).then(function() {
        mainServ.getUser().then(function(response) {
          $scope.user = response;
          $scope.username = response.data.username;
          $scope.userShown = !$scope.userShown;


          // $('#logger').text('LOGOUT');
          if($scope.user) {
            $('.userBackground').fadeIn(800);
            setTimeout(function() {
            $('.userBackground').fadeOut(800);
            },1500);

            $('#logger').text('LOGOUT');
            $('.headerLink').text('LOGOUT');
          } else {
            $('#logger').text('SIGNUP / IN');
            $('.headerLink').text('SIGNUP / IN');
          }
          $state.go('home');
        })
      })
      }
    }

    $(document).ready(function() {

      mainServ.getUser().then(function(response) {
        $scope.user = response;
        $scope.userShown = !$scope.userShown;
        // $('#logger').text('LOGOUT');
        if($scope.user) {
          $('#logger').text('LOGOUT');
          $('.headerLink').text('LOGOUT');
        } else {
          $('#logger').text('SIGNUP / IN');
          $('.headerLink').text('SIGNUP / IN');
        }
      // if($scope.user) {
      //   $('#logger').text('LOGOUT');
      // } else if ($scope.user == "") {
      //   $('#logger').text('SIGNUP / IN');
      // }
      })
    });

    $scope.logOut = function() {
      if($scope.user) {
        mainServ.logout().then(function(response) {
            $('#logger').text('SIGNUP / IN');
            $('.headerLink').text('SIGNUP / IN');
          $state.go('signIn');
        });
      }
    }

    $scope.toggleShown = false;

    $scope.showToggle = function() {
      $scope.toggleShown = !$scope.toggleShown;
      if ($scope.toggleShown) {
          $scope.$window.onclick = function (event) {
              closeSearchWhenClickingElsewhere(event, $scope.toggleShown);
          };
      } else {
          $scope.toggleShown = false;
          $scope.$window.onclick = null;
          $scope.$apply(); //--> trigger digest cycle and make angular aware.
      }
    }

    $scope.signinShown = true;
    $scope.signupShown = false;

    $scope.showSignup = function() {
      $scope.signinShown = !$scope.signinShown;
      $scope.signupShown = !$scope.signupShown;
    }

    $scope.userShown = false;

    $scope.getUser = function() {
      mainServ.getUser.then(function(response) {
        $scope.user = response;
        $scope.userShown = !$scope.userShown;
      })
    }

    $scope.signUpPage = function() {
      $state.go('signUp');
    }

    $scope.createUser = function(User) {
      mainServ.register(User).then(function(response) {
        $scope.signinShown = !$scope.signinShown;
        $scope.signupShown = !$scope.signupShown;
      })
    }

    $scope.open = function() {
      $scope.showModal = true;
    };

    $scope.openOwn = function() {
      $scope.showModalOwn = true;
    };

    $scope.openFav = function() {
      $scope.showModalFav = true;
    };

    $scope.ok = function() {
      $scope.showModal = false;
      $('.recipeDescription').empty();
      $('.number').val('');
    };

    $scope.okok = function() {
      $scope.showModalOwn = false;
      $('.recipeDescription').empty();
      $('.number').val('');
    };

    $scope.okFav = function() {
      $scope.showModalFav = false;
      $('.recipeDescription').empty();
      $('.number').val('');
    };

    $scope.cancel = function() {
      $scope.showModal = false;
      $('.recipeDescription').empty();
      $('.number').val('');
    };

    $scope.cancelcancel = function() {
      $scope.showModalOwn = false;
      $('.recipeDescription').empty();
      $('.number').val('');
    };

    $scope.cancelFav = function() {
      $scope.showModalFav = false;
      $('.recipeDescription').empty();
      $('.number').val('');
    };

    $scope.favheart = true;
    $scope.heart = false;

    // $scope.change = function(index) {
    //   $scope.favheart = !$scope.favheart;
    //   $scope.heart = !$scope.heart;
    // }

    $scope.favRecipe = function(recipeId) {

      if ($scope.user) {
      mainServ.addToFavorites(recipeId)
      .then(function(response) {

        return response.data;
      })

      }
      else {
        console.log('must be logged in');
      }
    }

    $scope.deleteFavRecipe = function(recipeId) {
      mainServ.removeFromFavorites(recipeId)
      .then(function(response) {
        $state.reload();

      })
    }

    $scope.searchOwnIngredient = function(recipe) {
      $scope.title = recipe.title;
      $scope.recipeImage = recipe.image_url;
      $scope.recipeSource = recipe.source_url;
      $scope.ranking = recipe.social_rank;
      $scope.publisher = recipe.publisher;
      $scope.recipeId = recipe.recipe_id;

      $scope.directions = recipe.directions;
      var recipeId = recipe.recipe_id;

      var list = recipe.ingredients;

          $scope.list = list;

          $('.recipeDescription').append('<ul class="ingList">');
          $(list).each(function(index, item) {
              $('.ingList').append(
                  $(document.createElement('li')).text(item)
              );
            })


      $scope.servingsShown = false;

      // recipeServ.getIngredients(recipeId).then(function(response) {
      //   console.log("ingredients: ", response.data.recipe.ingredients);
      //     var list = response.data.recipe.ingredients;
      //
      //     $scope.list = list;
      //
      //     $('.recipeDescription').append('<ul class="ingList">');
      //     $(list).each(function(index, item) {
      //         $('.ingList').append(
      //             $(document.createElement('li')).text(item)
      //         );
      //       })
      // })

    };


    $scope.searchFavoriteIngredient = function(recipe) {
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

});
