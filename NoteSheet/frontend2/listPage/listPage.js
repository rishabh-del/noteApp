'use strict';



angular.module('myApp.listPage', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'angular.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/listPage', {
            templateUrl: 'listPage/listPage.html',
            controller: 'listPageActCtrl'
        });
    }])
    .controller('listPageActCtrl', ['$http', '$scope', '$location', function ($http, $scope, $location) {
      
      console.log("here list page");
      $http.get('/getAllNotes').then(function(data, err){
        // console.log(data, err);
         if(err){
           alert("Could not fetch notes!");
         }else{
           $scope.list = [];
           console.log(typeof(data.data[0].Record.make));
           for(var i=0;i<data.data.length; i++){
           if(data.data[i].Record.make != "null"){
            $scope.list.push(data.data[i]);
           }
          }
        
 //$scope.list = data.data;
 var itemNo = $scope.list.length + 1;
 $scope.choices = [{id: 'choice' + itemNo, name: 'choice' + itemNo, items: itemNo}];

         }
       })
   
      $scope.addNewChoice = function() {
        var newItemNo = $scope.choices[$scope.choices.length - 1].items+1;
        $scope.choices.push({'id' : 'choice' + newItemNo, 'name' : 'choice' + newItemNo, items: newItemNo});
      };
      
      $scope.removeNewChoice = function(choice) {
console.log("in", choice);
      //  var newItemNo = $scope.choices.length-1;
        // if ( newItemNo !== 0 ) {
        //  $scope.choices.pop();
    
        // }
    var remove = {
      key: choice,
      value: null
    }
        $http.post('/removeNote', remove).then(function(data, err){
          if(err){
            console.log('Could not remove note',err);
          }else{
            console.log('Note removed successfully',data, data.config.data.value, typeof(data.config.data.value));
            if(data.config.data.value == null){
              alert("Data removed from blockchain");
              location.reload()
            }
          }
        })
      }
      
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

      $http.post('/changeNotes', allNotes).then(function(data, err){
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
