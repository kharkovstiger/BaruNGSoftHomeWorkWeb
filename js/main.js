app.controller('mainCtrl', ['$scope', '$http', 'customerId', '$location', function($scope, $http,customerId, $location) {

    var baseURL='https://ngsoft.herokuapp.com/api';
    $scope.customers=[];

    $http.get(baseURL+"/customer/all").then(
        function (response) {
            // console.log(response);
            $scope.customers=response.data;
            var list=[];
            for(var i=0;i<$scope.customers.length;i++){
                list.push($scope.customers[i].id);
            }
            $http.post(baseURL+"/order/getNumberOfOrders",list).then(
                function (response) {
                    for(var i=0;i<$scope.customers.length;i++){
                        $scope.customers[i].numberOfOrders=response.data[$scope.customers[i].id];
                    }
                }
            );
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