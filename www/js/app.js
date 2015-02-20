// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope) {
  $rootScope.$on('handleEmit', function(event, args) {
        console.log("broadcasting down");
        $rootScope.$broadcast('handleBroadcast');
    });

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $sceDelegateProvider.resourceUrlWhitelist([
  'self',
   'https://www.youtube.com/**'
  ]);

  var tabs1 = {
    name: 'tabs1',
    url: '/tabs1',
    abstract: true,
     templateUrl: "templates/tabs.html", 
  };

 
  var main = {
      name: 'tabs1.main',
      url: '/top',
      views: {
        'top': {
          templateUrl: 'templates/main.html',
          controller: 'mainController'
        }
      }
  };
  
  var movieDetail = {
    name: 'tabs1.main.movieDetail',
     url: '/:movieId',
      views: {
        'top@tabs1': {
          templateUrl: 'templates/movieDetail.html',
          controller: 'MovieDetailCtrl'
        }
      }
  };

   var tabs2 = {
    name: 'tabs2',
    url: '/tabs2',
    abstract: true,
     templateUrl: "templates/tabs.html",
   
  };

  var mymovies = {
    name: 'tabs2.mymovies',
    url: '/mymovies',
      views: {
        'mymovies': {
          templateUrl: 'templates/myMovies.html',
          controller: 'MyMovies'
        }
      }
  };

  var movieDetail2 = {
    name: 'tabs2.mymovies.movieDetail2',
     url: '/:movieId',
      views: {
        'mymovies@tabs2': {
          templateUrl: 'templates/movieDetail.html',
          controller: 'MovieDetailCtrl'
        }
      }
  };

  var tabs3 = {
    name: 'tabs3',
    url: '/tabs3',
    abstract: true,
     templateUrl: "templates/tabs.html",
   
  };
  
  var trailer = {
      name: 'tabs3.trailer',
      url: '/trailer/:movieId',
      views: {
        'trailer': {
          templateUrl: 'templates/trailer.html',
          controller: 'TrailerController'
        }
      }
  };

   var tabs4 = {
    name: 'tabs4',
    url: '/tabs4',
    abstract: true,
     templateUrl: "templates/tabs.html",
   
  };

  var sort = {
    name: 'tabs4.sort',
    url: '/sort',
      views: {
        'sort': {
          templateUrl: 'templates/sort.html',
          controller: 'MyMovies'
        }
      }
  };

  var movieDetail4 = {
    name: 'tabs4.sort.movieDetail4',
     url: '/:movieId',
      views: {
        'sort@tabs4': {
          templateUrl: 'templates/movieDetail.html',
          controller: 'MovieDetailCtrl'
        }
      }
  }
  
  $stateProvider.state(tabs1);
  $stateProvider.state(main);
  $stateProvider.state(movieDetail);

  $stateProvider.state(tabs2); 
  $stateProvider.state(mymovies);
  $stateProvider.state(movieDetail2);

  $stateProvider.state(tabs3); 
  $stateProvider.state(trailer);
  
   $stateProvider.state(tabs4); 
  $stateProvider.state(sort);
  $stateProvider.state(movieDetail4);

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs1/top');

});
