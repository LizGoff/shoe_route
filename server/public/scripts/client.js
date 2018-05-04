console.log('Hi!');

var app = angular.module('ShoeApp', []);

app.controller('shoeController', ['$http', function ($http) {
    console.log('shoeController Loaded');

    var self = this;
    self.shoeList = [];

        self.newShoes = {
            name: '',
            cost: '',
            socks: false
        };

    self.getShoeEntry = function () {
        $http({
            method: 'GET',
            url: '/shoes'
        })
            .then(function (response) {
                self.shoeList = response.data;
                console.log('get response', response.data);
            })
            .catch(function (error) {
                console.log('error on /shoes Get', error);
            });
    };

// ???? place this in the GET????   pool.query(`INSERT INTO "shoes" ("name", "cost", "socks")
//                                  VALUES ($1, $2, $3);`, [shoe.name, shoe.cost, shoe.socks]) 
//                                  .then((results) => {
//                                  res.sendStatus(200);
//                              })
//                                  .catch((error) => {
//                                  console.log('Error with Postman pool', error);
//                                  res.sendStatus(500)  ????


    self.createShoeEntry = function () {
        $http({
            method: 'POST',
            url: '/shoes',
            data: self.newShoes
        })
            .then(function (response) {
                self.newShoes.name = '';
                self.newShoes.cost = '';
                self.getShoeEntry();
                console.log(response);
            })
            .catch(function (error) {
                console.log('error on /shoes Post', error);
            });
    };

    self.deleteShoes = function (deleteShoes) {
        console.log(self.newShoes);
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
        console.log(self.newShoes);
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

