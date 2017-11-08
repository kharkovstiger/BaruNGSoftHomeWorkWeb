app.controller('orderCtrl', ['$scope', '$http', '$location','orderId', 'customerId',
    function($scope, $http, $location, orderId, customerId) {

        var baseURL='https://ngsoft.herokuapp.com/api';

        if (orderId.get()!==null) {
            $http.get(baseURL + "/order/" + orderId.get()).then(
                function (response) {
                    // console.log(response);
                    $scope.order = response.data;
                },
                function (response) {
                    console.log(response.status + ", " + response.data);
                }
            );
        }

        $scope.save=function () {
            $scope.order.customerId=customerId.get();
            $http.post(baseURL+"/order/add", $scope.order).then(
                function (response) {
                    // console.log(response);
                    $scope.order=response.data;
                    orderId.set($scope.order.id);
                }
            );
        };

}]);