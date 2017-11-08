app.controller('customerCtrl', ['$scope', '$http', '$location', 'customerId', 'orderId',
    function($scope, $http, $location, customerId, orderId) {

    var baseURL='https://ngsoft.herokuapp.com/api';
    $scope.orders=[];
    $scope.id=customerId.get();

    if (customerId.get()!==null) {
        $http.get(baseURL + "/customer/" + customerId.get()).then(
            function (response) {
                console.log(response);
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
                $scope.id=customerId.get();
            },
            function (response) {
                var list=document.getElementsByClassName('wrong');
                for (var i=0;i<list.length;i++){
                    list[i].classList.remove('wrong');
                }
                var el;
                switch (response.data){
                    case "Wrong Email":
                        el=document.getElementById('email');
                        break;
                    case "Wrong first name":
                        el=document.getElementById("firstName");
                        break;
                    case "Wrong last name":
                        el=document.getElementById("lastName");
                        break;
                    case "Wrong age":
                        el=document.getElementById("age");
                        break;
                }
                el.focus();
                el.classList.add('wrong');
            }
        );
    };

    $scope.toOrder=function (id) {
        orderId.set(id);
        $location.url('/order');
    }
}]);