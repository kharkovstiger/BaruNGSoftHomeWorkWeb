app.controller('customerCtrl', ['$scope', '$http', '$location', 'customerId', 'orderId',
    function($scope, $http, $location, customerId, orderId) {

    var baseURL='https://ngsoft.herokuapp.com/api';
    $scope.orders=[];

    if (customerId.get()!==null) {
        $http.get(baseURL + "/customer/" + customerId.get()).then(
            function (response) {
                // console.log(response);
                $scope.customer = response.data;
            },
            function (response) {
                console.log(response.status + ", " + response.data);
            }
        );

        $http.get(baseURL + "/order/getByCustomerId?id=" + customerId.get()).then(
            function (response) {
                // console.log(response);
                $scope.orders = response.data;
            },
            function (response) {
                console.log(response.status + ", " + response.data);
            }
        );
    }

    $scope.save=function () {
        $http.post(baseURL+"/customer/add", $scope.customer).then(
            function (response) {
                // console.log(response);
                $scope.customer=response.data;
                customerId.set($scope.customer.id);
            }
        );
    };

    $scope.toOrder=function (id) {
        orderId.set(id);
        $location.url('/order');
    }
}]);