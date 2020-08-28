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
      $http.get('/getAllNotes').then(function(data, err){
        // console.log(data, err);
         if(err){
           alert("Could not fetch notes!");
         }else{
           console.log(data.data);
 $scope.list = data.data;
 var itemNo = $scope.list.length + 1;
 $scope.choices = [{id: 'choice' + itemNo, name: 'choice' + itemNo, items: itemNo}];

         }
       })
   
      $scope.addNewChoice = function() {
        var newItemNo = $scope.choices[$scope.choices.length - 1].items+1;
        $scope.choices.push({'id' : 'choice' + newItemNo, 'name' : 'choice' + newItemNo, items: newItemNo});
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
       console.log($scope.choices);
        for(var i = 0;i<$scope.choices.length;i++){
     // var data =  document.getElementById("inputNote").value
        var noteData = {
        key : $scope.choices[i].id,
        value: $scope.choices[i].name
        }
        allNotes.push(noteData);
         console.log(allNotes);
     }

     $http.post('/submitNotes', allNotes).then(function(data, err){
       console.log(data, err);
       if(err){
         alert("Unable to push data to blockchain : " + err);
       }else{
         alert("Notes Saved To Blockchain!");
        location.reload()
       }
     })
     console.log(allNotes);
   }

    $scope.getAllNotes = function(){
      $location.path('/listPage')
     
    }
    }]);
