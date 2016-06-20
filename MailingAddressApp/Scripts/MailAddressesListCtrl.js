app.controller('MailAddressesListCtrl', ['$scope', 'MailAddressesListModel', MailAddressesListCtrl])
.factory('MailAddressesListModel', MailAddressesListModel)
.filter('MailAdsFilter', MailAdsFilter)
.filter('HouseNumberFilter', HouseNumberFilter)
.filter('DateRangeFilter', DateRangeFilter);

function MailAdsFilter() {
    return function (input, from, until, dateFrom, dateUntil) {
        return input.filter(function (item) {
            return (item.HouseNumber >= from) && (item.HouseNumber <= until) && (item.CreationDate.slice(6,-2) >= dateFrom) && (item.CreationDate.slice(6,-2) <= dateUntil);
        });
    };
};

function DateRangeFilter(dateFilter) {
    return function (input) {
        return dateFilter(input.fromDate, 'dd.MM.yyyy') + "-" + dateFilter(input.untilDate, 'dd.MM.yyyy');
    }
}

function HouseNumberFilter() {
    return function (input) {
        if (input.valueUntil == input.max && input.valueFrom == input.min) {
            return null;
        }
        if (input.valueFrom < input.min || !input.valueFrom) {
            input.valueFrom = input.min;
        }
        if (input.valueFrom > input.valueUntil) {
            input.valueFrom = input.valueUntil;
        }
        if (input.valueUntil > input.max || !input.valueUntil) {
            input.valueUntil = input.max;
        }
        if (input.valueUntil < input.valueFrom) {
            input.valueUntil = input.valueFrom;
        }

        return input.valueFrom + " - " + input.valueUntil;
    }
}

function MailAddressesListCtrl($scope, MailAddressesListModel) {
    $scope.mailAddressesList = null;
    MailAddressesListModel.GetMailAddressesList().then(function (data) {
        $scope.mailAddressesList = data.data;
        if ($scope.mailAddressesList.length > 0) {
            var max = $scope.mailAddressesList[0].HouseNumber;
            var min = $scope.mailAddressesList[0].HouseNumber;
            var minDate = $scope.mailAddressesList[0].CreationDate;
            $scope.mailAddressesList.forEach(function (item) {
                //console.log(item.CreationDate.slice(6,-2) + " " + minDate);
                if (item.HouseNumber > max) {
                    max = item.HouseNumber;
                }
                if (item.HouseNumber < min) {
                    min = item.HouseNumber;
                }
                if (item.CreationDate.slice(6,-2) < minDate.slice(6, -2)) {
                    minDate = item.CreationDate;
                }
            });
            $scope.houseNumberFilter.min = min;
            $scope.houseNumberFilter.max = max;
            //console.log(minDate.slice(6, -2) + " " + new Date());
            $scope.dateFilter.fromDate = minDate.slice(6, -2);
            $scope.dateFilter.untilDate = new Date();
            //console.log($scope.dateFilter.fromDate);
        }
    }, function (error) {
        alert("Error! Can't get mail address list!");
    });

    $scope.dateFilter = {
        fromDate: undefined,
        untilDate: undefined
    };

    $scope.houseNumberFilter = {
        valueFrom: 1,
        valueUntil: 999,
        min: 1,
        max: 999
    };

    $scope.onHouseNumberHide = function () {
        alert("Hide");
    };
    
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
};