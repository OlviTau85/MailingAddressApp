app.controller('MailAddressesListCtrl', ['$scope', 'MailAddressesListModel', function ($scope, MailAddressesListModel) {
    $scope.mailAddressesList = null;
    MailAddressesListModel.GetMailAddressesList().then(function (data) {
        $scope.mailAddressesList = data.data;
    }, function (error) {
        alert("Error! Can't get mail address list!");
    });

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
