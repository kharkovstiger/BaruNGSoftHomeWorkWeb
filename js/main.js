app.controller('mainCtrl', ['$scope', '$http', 'customerId', '$location', function($scope, $http,customerId, $location) {

    var baseURL='https://ngsoft.herokuapp.com/api';
    $scope.customers=[];

    $http.get(baseURL+"/customer/all").then(
        function (response) {
            // console.log(response);
            $scope.customers=response.data;
        },
        function (response) {
            console.log(response.status+", "+response.data);
        }
    );

    $scope.toCustomer=function (id) {
        customerId.set(id);
        $location.url('/customer');
    }
}]);