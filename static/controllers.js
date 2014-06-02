angular.module('psaltir.controllers', [])

.controller('PsaltirCtrl', function($scope, $state, $ionicActionSheet, $ionicModal, $ionicPopup, psaltirConfig) {

    $scope.show = function() {
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

    $scope.goHome = function() {
      $state.go("index" );
    }

    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    // close the modal w/o saving
    $scope.closeModal = function () {
      $scope.modal.hide();
      $scope.config = psaltirConfig.get();
    };

    // save and close modal
    $scope.saveConfig = function() {
      $scope.modal.hide();
      $scope.config.fontstyle = $scope.config.fontsize + "%";
      psaltirConfig.save($scope.config);
    }

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

    $scope.slava = function(num) {

      var txt_short="荣光赞词";
      var txt_long =  "榮耀歸於父及子及聖靈，自今至永遠及于萬世，阿們。\n" +
                      "阿利魯伊亞，阿利魯伊亞，阿利魯伊亞，榮耀歸於祢，上帝。\n" + 
                      "阿利魯伊亞，阿利魯伊亞，阿利魯伊亞，榮耀歸於祢，上帝。\n" + 
                      "阿利魯伊亞，阿利魯伊亞，阿利魯伊亞，榮耀歸於祢，上帝。\n" + 
                      "榮耀歸於父及子及聖靈，\n";

      if (num == 1 && $scope.config.alive.trim().length > 0) 
        txt_long += "主啊，求祢紀念祢的僕役 " + $scope.config.alive + "\n";

      if (num == 2 && $scope.config.dead.trim().length > 0) 
        txt_long += "主啊，求赐安息於祢亡故的僕役 " + $scope.config.dead + "\n" ;

      txt_long += "自今至永遠及于萬世，阿們。\n";

      if ($scope.config.showAll || $scope.config.alive.trim().length > 0 || $scope.config.dead.trim().length > 0)
        return txt_long;

      else
        return txt_short;
    }

})

.service('psaltirConfig', function() {

  this.get = function() {
    if (localStorage['psaltirionic'] == null) 
      return { fontsize: '100', alive: 'John', dead: '', showAll: false };

    else 
      config = JSON.parse(localStorage['psaltirionic']);
      config.fontstyle = config.fontsize + "%";
      return config;

  };

  this.save = function(config) {
    localStorage['psaltirionic'] = JSON.stringify(config);
  };

})

.run(function($rootScope,  $window, $state, psaltirConfig) {
  $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {

    config = psaltirConfig.get();

    if (!$window.sessionStorage.initialized) {
        $window.sessionStorage.initialized = true;

        if (config.state && config.state != 99) {
          e.preventDefault();
          $state.go("kafisma", { id: config.state } );
        }

    } else if (toState.name == "index") {
      config.state = 99;

    } else {
      config.state = toParams.id
    }

    psaltirConfig.save(config);

  });


  $rootScope.$on('$stateNotFound',  function(event, unfoundState, fromState, fromParams) {
    alert('not found');
  });

});


