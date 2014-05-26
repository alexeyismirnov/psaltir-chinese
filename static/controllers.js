angular.module('psaltir.controllers', [])

.controller('PsaltirCtrl', function($scope, $ionicActionSheet) {

 $scope.show = function() {

   // Show the action sheet
   $ionicActionSheet.show({
     buttons: [
       { text: 'Options' },
       { text: 'About this app' },
     ],
     destructiveText: 'Exit app',
     buttonClicked: function(index) {
       return true;
     }
   });

 };

})



