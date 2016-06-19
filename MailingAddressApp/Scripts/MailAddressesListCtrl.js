app.controller('MailAddressesListCtrl', ['$scope', 'MailAddressesListModel', function ($scope, MailAddressesListModel) {
    $scope.mailAddressesList = null;
    MailAddressesListModel.GetMailAddressesList().then(function (data) {
        $scope.mailAddressesList = data.data;
    }, function (error) {
        alert("Error! Can't get mail address list!");
    });
    
    $scope.dateFilter = {
        fromDate: undefined,
        untilDate: undefined
    };

    $scope.houseNumberFilter = {
        valueFrom: 1,
        valueUntil: 100
    };

    $scope.filter4 = undefined;
    $scope.filterHouseNumber = function () {
        $scope.filter4 = $scope.houseNumberFilter.valueFrom.toString() + " - " + $scope.houseNumberFilter.valueUntil.toString();
    };

    /*$scope.filter4Change = function () {
        var values = $scope.filter4.split(/\s-\s/);
        $scope.houseNumberFilter.valueFrom = parseInt(values[0]);
        $scope.houseNumberFilter.valueUntil = parseInt(values[1]);
        $scope.filter4 = $scope.houseNumberFilter.valueFrom.toString() + " - " + $scope.houseNumberFilter.valueUntil.toString();
    };*/

    $scope.sortField = undefined;
    $scope.reverse = false;

    $scope.sort = function (fieldName) {
        if ($scope.sortField === fieldName) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.sortField = fieldName;
            $scope.reverse = false;
        }
    };
    $scope.isSortUp = function (fieldName) {
        return $scope.sortField === fieldName && !$scope.reverse;
    };
    $scope.isSortDown = function (fieldName) {
        return $scope.sortField === fieldName && $scope.reverse;
    };
}])
.factory('MailAddressesListModel', MailAddressesListModel);

app.filter('mailAdsFilter', function() {
    return function (input) {
        input
    }
});