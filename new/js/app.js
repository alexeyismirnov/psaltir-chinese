// Ionic Psaltir App

angular.module('psaltir', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/home.html'
  })

  .state('kafisma', {
    url: '/kafisma/:id',
    templateUrl: function (stateParams){
      return  'templates/kafisma' + stateParams.id + '.html';
    }

  });

  $urlRouterProvider.otherwise('/');


});


