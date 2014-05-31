angular.module('psaltir.controllers', [])

.controller('PsaltirCtrl', function($scope, $ionicActionSheet, $ionicModal) {

 $scope.show = function() {

   // Show the action sheet
   $ionicActionSheet.show({
     buttons: [
       { text: 'Options' },
       { text: 'About this app' },
     ],
     destructiveText: 'Exit app',
     buttonClicked: function(index) {
       $scope.modal.show();
       return true;

     }
   });
};

    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // function to open the modal
    $scope.openModal = function () {
      $scope.modal.show();
    };

    // function to close the modal
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

})



