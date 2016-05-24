angular.module('recipeApp').service('recipeServ', function($http, $q) {

  this.getApiRecipe = function(ingredient) {
  return $http({
    method: 'GET',
    url: 'http://food2fork.com/api/search?key=1317611f9820c441d26165b8c7ac5447&q=' + ingredient
    //key: '1317611f9820c441d26165b8c7ac5447'
  }).then(function(response) {
    for (var i = 0; i < response.data.recipes.length; i++) {
      response.data.recipes[i].social_rank =
      Math.floor(response.data.recipes[i].social_rank);
    }
    return response;
  })
  }

  this.getIngredients = function(recipeId) {
  return $http({
    method: "GET",
    url: 'http://food2fork.com/api/get?key=1317611f9820c441d26165b8c7ac5447&rId=' + recipeId
  })
  }

  this.changeServings = function(list, increaseBy) {
    $('.recipeDescription').empty();
    function servings(list, num) {
        var items = [];
    for(var i = 0; i < list.length; i++) {
      var item = list[i].split(" ");
      if (Number(item[0])) {
        if(item[0] == 1) {
          item[1] = item[1] + 's';
        }
        item[0] = (Number(item[0])) * num;
        item[0] = item[0].toString();
      }
      else if(/\d/.test(item[0]) && eval(item[0])) {
        item[0] = eval(item[0]);
        if(item[0] <= 1) {
            item[1] = item[1] + 's';
          }
        item[0] = (Number(item[0])) * num;
        item[0] = item[0].toString();
      }
      else {
        item[0] = item[0] + 's';
        item.unshift(num);
      }

      if(item[0] >= 4 && item[1] === 'teaspoons') {
    var count = 0;
    do{item[0] -= 4; count++}while(item[0] > 3);

    if(item[0] === 0) {
      item.shift();
      item.shift();
    }
    if(count > 1) {
      item.unshift('tablespoons');
    }
    else {
      item.unshift('tablespoon');
    }
    item.unshift(count.toString());
    }

    if(item[0] >= 16 && item[1] === 'tablespoons') {
      var count = 0;
      do{item[0] -= 16; count++}while(item[0] > 15);

      if(item[0] === 0) {
        item.shift();
        item.shift();
      }
      if(count > 1) {
        item.unshift('cups');
      }
      else {
        item.unshift('cup');
      }
      item.unshift(count.toString());
    }
    item = item.join(' ');
    items.push(item);
    }

    $('.recipeDescription').append('<ul class="ingList">');
    $(items).each(function(index, item) {
        $('.ingList').append(
            $(document.createElement('li')).text(item)
        );
      })

    }

    servings(list, increaseBy);
  }

  this.addRecipe = function(recipe) {
    return $http({
      method: 'POST',
      url: '/api/recipes',
      data: {
        title: recipe.title,
        recipe_id: recipe.recipe_id,
        image_url: recipe.image_url,
        publisher: recipe.publisher,
        social_rank: recipe.social_rank
      }
    }).then(function(response) {
      return response;
    })
  }

  this.searchQuery = function(term) {
    return $http({
      method: "POST",
      url: '/api/searchTerm',
      data: {title: term}
    })
  }

})
