'use strict';



angular.module('myApp.landing', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/landing', {
            templateUrl: 'landing/landing.html',
            controller: 'landingActCtrl'
        });
    }])
    .controller('landingActCtrl', ['$http', '$scope', '$location', function ($http, $scope, $location) {
      
      console.log("here");
      $scope.choices = [{id: 'choice1', name: 'choice1'}];
   
      $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.push({'id' : 'choice' + newItemNo, 'name' : 'choice' + newItemNo});
      };
      
      $scope.removeNewChoice = function() {
        var newItemNo = $scope.choices.length-1;
        if ( newItemNo !== 0 ) {
         $scope.choices.pop();
        }
      };
      
      $scope.showAddChoice = function(choice) {
        return choice.id === $scope.choices[$scope.choices.length-1].id;
      };

      $scope.submitNotes = function(){
         // var choice
         var allNotes = [];
         for(var i = 0;i<$scope.choices.length;i++){
       var data =  document.getElementById("inputNote").value
         var note = {
         key : $scope.choices[i].id,
         value: data
         }
         allNotes.push(note);
          console.log(allNotes);
      }

      $http.post('/submitNotes', allNotes).then(function(data, err){
        console.log(data, err);
        if(err){
          alert("Unable to push data to blockchain : " + err);
        }else{
          alert("Notes Saved To Blockchain!");
        }
      })
      console.log(allNotes);
    }
    }]);
