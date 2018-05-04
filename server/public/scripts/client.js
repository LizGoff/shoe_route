console.log('Hi!');

var app = angular.module('ShoeApp', []);

app.controller('shoeController', ['$http', function ($http) {
    console.log('shoeController Loaded');

    var self = this;
    self.shoeList = {
        list: []
    };

    self.shoes = {   //newShoes
    };

    self.getShoeEntry = function () {
        $http({
            method: 'GET',
            url: '/shoes'
        })
            .then(function (response) {
                self.shoeList.list = response.data;
                console.log('get response', response.data);
            })
            .catch(function (error) {
                console.log('error on /shoes Get', error);
            });
    }; 

    self.createShoeEntry = function (shoeList) {
        $http({
            method: 'POST',
            url: '/shoes',
            data: shoeList   //newShoes
        })
            .then(function (response) {
                self.shoes.name = '';    //newShoes
                self.shoes.cost = '';    //newShoes
                self.getShoeEntry();
                console.log(self.shoeList.list)
                console.log(response);
            })
            .catch(function (error) {
                console.log('error on /shoes Post', error);
            });
    };

    self.deleteShoes = function (deleteShoes) {
        console.log(self.shoes); //newShoes
        $http({
            method: "DELETE",
            url: "/shoes",
            params: deleteShoes
        })
            .then(function (response) {
                self.getShoeEntry();
                console.log('response from delete', response);
            })
            .catch(function (error) {
                console.log('error on /shoes DELETE', error);
            });
    }

    self.socksButton = function (socksUpdateSave) {
        console.log(self.shoes); //newShoes
        $http({
            method: "PUT",
            url: "/shoes",
            data: socksUpdateSave
        })
            .then(function (response) {
                self.getShoeEntry();
                console.log('completed in database', response);
            })
            .catch(function (error) {
                console.log('error on /shoes PUT', error);
            });
    }

    self.getShoeEntry();

}]);

