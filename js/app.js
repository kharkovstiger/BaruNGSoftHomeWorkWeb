var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "main.html"
        })
        .when("/customer", {
            templateUrl : "customer.html"
        })
        .when("/order", {
            templateUrl : "order.html"
        })
});

app.factory('customerId', function() {
    var savedData = {};

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
});

app.factory('orderId', function() {
    var savedData = {};

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
});

app.directive('goClick', function ($location) {
   return function (scope, element, attrs) {
       var path;

       attrs.$observe('goClick', function (interpolatedValue) { path=interpolatedValue});

       element.bind('click',function () {
           scope.$apply(function () {
               $location.path(path);
           })
       })
   }
});