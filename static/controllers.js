angular.module('psaltir.controllers', [])

.controller('PsaltirCtrl', function($scope, $ionicActionSheet, $ionicModal, $ionicPopup, psaltirConfig) {

 $scope.show = function() {

   // Show the action sheet
   $ionicActionSheet.show({
     buttons: [
       { text: '选项' },
       { text: 'About this app' },
     ],
     destructiveText: 'Exit app',
     buttonClicked: function(index) {
       switch (index) {
       case 0:
           $scope.openModal();
           break;
       case 1:
           $scope.about();
           break;

       default:
           break;
       }
       return true;
     },

     destructiveButtonClicked: function() {
       $scope.confirmExit();
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
      $scope.config = psaltirConfig.get();
      $scope.modal.show();
    };

    // function to close the modal
    $scope.closeModal = function () {
      $scope.modal.hide();
    };


    $scope.about = function() {
      $ionicPopup.alert({
        title: "О программе", 
        template: "The app was created by Orthodox Brotherhood of Saint Apostles Peter and Paul in Hong Kong. Text of the Psalter was translated into Mandarin Chinese by Bishop Innokenty of Beijing and published by the Russian Mission (Beiguan) in 1910."
      });

    };

    $scope.confirmExit = function() {
      $ionicPopup.confirm({
        title: "Exit app", 
        template: "Do you want to exit app?",
        cancelText: '取消'

      }).then(function (res) {
        if (res)
          navigator.app.exitApp();
      });
    };

    $scope.config = psaltirConfig.get();

    $scope.saveConfig = function() {
      $scope.modal.hide();
      psaltirConfig.save($scope.config);
    }

})

.service('psaltirConfig', function() {

  this.get = function() {
    if (localStorage['psaltirionic'] == null) 
      return { fontsize: 14, alive: 'John', dead: '', showAll: false };

    else 
      return JSON.parse(localStorage['psaltirionic']);

  };

  this.save = function(config) {
    localStorage['psaltirionic'] = JSON.stringify(config);
  };

});


