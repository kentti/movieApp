angular.module('starter.controllers', [])


//Top filmid:
.controller('mainController', ['$scope','$http', function($scope,$http) {
  $http.get("http://api.themoviedb.org/3/movie/top_rated?api_key=8193c31979f63d883a13f1a8d555e1c2")
  .success(function(response) {
    $scope.movies = response.results;
    
  })

//Filmide otsing:
$scope.search = function(keyword) {

  if(keyword === ""){
    var url = "http://api.themoviedb.org/3/movie/top_rated?api_key=8193c31979f63d883a13f1a8d555e1c2";
  }else url = "http://api.themoviedb.org/3/search/movie?query="+ keyword+"&api_key=8193c31979f63d883a13f1a8d555e1c2";

  $http.get(url).success(function(response) {
    $scope.movies = response.results;

  })
}
}])

//filmivaade:
.controller('MovieDetailCtrl', ['$rootScope', '$scope','$http', '$stateParams',  function($rootScope, $scope, $http, $stateParams) {

  try {
    $scope.nupp = 'Like'
    var json = JSON.parse(localStorage['savedMovies']);

  }
  catch(err) {
    $scope.nupp = 'Like'
    json = [];
  }


  for(var i = 0; i < json.length; i++) {
   if(parseInt(json[i].id) === parseInt($stateParams.movieId)){
    $scope.nupp = 'Delete';
    $scope.movie = json[i];
    console.log(json[i]);
    break;
  }else $scope.nupp = 'Like';
}


$http.get("http://api.themoviedb.org/3/movie/ "+ $stateParams.movieId +"?api_key=8193c31979f63d883a13f1a8d555e1c2").success(function(response) {
  $scope.movie = response;
  $http.get("http://api.themoviedb.org/3/movie/ "+ $stateParams.movieId +"/credits?api_key=8193c31979f63d883a13f1a8d555e1c2").success(function(credits){

   $scope.cast = credits.cast;
 })
});

    //like the movie
    $scope.favorite = function(movie) {

      if(typeof(Storage) !== 'undefined' && $scope.nupp === 'Like'){
        console.log("liked");
        $scope.nupp = 'Delete';
        if (localStorage['savedMovies'] === undefined){
          localStorage['savedMovies'] = [];
          jsonObject = [];
        }
        else {
         try {

          var jsonObject = JSON.parse(localStorage['savedMovies']);
        }
        catch(err) {
         jsonObject = [];
       }
     }

     movie.date = new Date();
     jsonObject.push(movie);

     localStorage['savedMovies'] = JSON.stringify(jsonObject);

     $scope.$emit('handleEmit');
     $state.reload();

       //Delete the movie
     }else if (typeof(Storage) !== 'undefined' && $scope.nupp === 'Delete'){

      var jsonData = JSON.parse(localStorage['savedMovies']);
      for(var i = 0; i < json.length; i++) {

       if(parseInt(jsonData[i].id) === parseInt($stateParams.movieId)){
        console.log("deleted");
        $scope.nupp = 'Like';
        jsonData.splice(i,1);
        localStorage['savedMovies'] = JSON.stringify(jsonData);
        $scope.$emit('handleEmit');
        $state.reload();
        break;
      }
    }

  }else{
    alert('I have failed you...');

  }


}

}])


//my movies vaade:
.controller('MyMovies', function($rootScope, $scope, $state) {

  $rootScope.$on('handleBroadcast', function(event) {
   console.log("handleBroadcast");

   var jsonObject = JSON.parse(localStorage['savedMovies']);
   $scope.movies = jsonObject;
   $state.reload();


 }); 

  //console.log("minulist");
  //console.log(localStorage['savedMovies']);

  var jsonObject = JSON.parse(localStorage['savedMovies']);
  $scope.movies = jsonObject;

  $scope.setOrder = function (order) {
  if($scope.order == order){
     $scope.order = ('-'  + order);
  }else  $scope.order = order;
};

})


//traileri vaate controller
.controller('TrailerController', ['$scope', '$rootScope', '$sce','$http', '$stateParams', function($scope, $rootScope, $sce, $http, $stateParams) {
  var videoId = 0;
  

  $http.get("http://api.themoviedb.org/3/movie/"+ $stateParams.movieId +"/videos?api_key=8193c31979f63d883a13f1a8d555e1c2")
  .success(function(response) {

    videoId = response.results[0].key;
    //console.log("http://www.youtube.com/embed/" + videoId);


  })
  $scope.getIframeSrc = function () {
    var url = 'http://www.youtube.com/embed/' + videoId;
    //console.log(url);
   // $rootScope.trailer = videoId;
   return $sce.trustAsResourceUrl(url);
 }


}]);




