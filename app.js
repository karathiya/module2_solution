(function(){
  'use strict';

  angular.module('ShoppingListApp', [])
  // .controller('ShoppingListAddController', ShoppingListAddController)
  // .controller('ShoppingListShowController', ShoppingListShowController)
  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .service('ShoppingListService', ShoppingListService)


  ShoppingListController1.$inject = ['$scope','ShoppingListService'];

  function ShoppingListController1($scope,ShoppingListService){
      var list1 = this;
    //  var shoppingList = ShoppingListFactory();
        list1.toBuyItems = ShoppingListService.getItemsToBuy();
        list1.itemName = "";
        list1.quantity = "";
        list1.buy = function(itemIndex) {
          ShoppingListService.action(itemIndex);
          $scope.checkBasket = list1.toBuyItems.length;
          $scope.boughtList = ShoppingListService.getBoughtCount();
        };
      }

  ShoppingListController2.$inject = ['$scope','ShoppingListService'];

  function ShoppingListController2($scope, ShoppingListService){
      var list2 = this;
      list2.getItemsbought = ShoppingListService.getItemsbought();
    }

  function ShoppingListService() {
      var service = this;
      var toBuyItems = [{name: "Cookies", quantity:"10"}, {name: "Bread", quantity:"2 Packets"}, {name: "Eggs", quantity:"10 pieces"}, {name: "Sugar", quantity:"2 KG"}, {name: "Potatoes", quantity:"2 KG"}];
      var boughtItems = [];
      var boughtItemCount = 0;

      service.action = function(itemIndex) {
        service.addTobought(itemIndex);
        service.removeFromBuy(itemIndex);
      };

      service.addTobought = function(itemIndex) {
      //  console.log(toBuyItems.length);
        var itemName = toBuyItems[itemIndex].name;
        var quantity = toBuyItems[itemIndex].quantity;
      //  console.log("item Name:" +itemName);
      //  console.log("Quantity :" +quantity);
        var item = {
              name: itemName,
              quantity: quantity
            };
        boughtItems.push(item);
        boughtItemCount += 1;
      };

      service.removeFromBuy = function(itemIndex){
        toBuyItems.splice(itemIndex,1);
      };

      service.getItemsToBuy = function() {
          return toBuyItems;
      };

      service.getBoughtCount = function() {
          return boughtItemCount;
      }

      service.getItemsbought = function() {
        //console.log(boughtItems.length);
          return boughtItems;
      };
  }

})();
