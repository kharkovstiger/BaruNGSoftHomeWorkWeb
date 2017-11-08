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
                },
                function (response) {var list=document.getElementsByClassName('wrong');
                    for (var i=0;i<list.length;i++){
                        list[i].classList.remove('wrong');
                    }
                    var el;
                    switch (response.data){
                        case "Wrong description":
                            el=document.getElementById("description");
                            break;
                        case "Wrong price":
                            el=document.getElementById("price");
                            break;
                        case "Wrong quantity":
                            el=document.getElementById("quantity");
                            break;
                        case "Wrong date":
                            el=document.getElementById("date");
                            break;
                    }
                    el.focus();
                    el.classList.add('wrong');
                }
            );
        };

}]);