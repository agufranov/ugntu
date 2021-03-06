// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.news', {
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/news.html'
      }
    }
  })

  .state('app.history', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html'
      }
    }
  })

  .state('app.admission', {
    url: '/admission',
    views: {
      'menuContent': {
        templateUrl: 'templates/admission.html'
      }
    }
  })

  .state('app.specialties', {
    url: '/specialties',
    views: {
      'menuContent': {
        templateUrl: 'templates/specialties.html'
      }
    }
  })

  .state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'templates/test.html',
        controller: 'TestCtrl'
      }
    }
  })

  .state('app.achievements', {
    url: '/achievements',
    views: {
      'menuContent': {
        templateUrl: 'templates/achievements.html'
      }
    }
  })

  .state('app.extracurricular', {
    url: '/extracurricular',
    views: {
      'menuContent': {
        templateUrl: 'templates/extracurricular.html',
        controller: 'ExtraCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/news');
});
