app.controller('MailAddressesListCtrl', ['$scope', 'MailAddressesListModel', MailAddressesListCtrl])
.factory('MailAddressesListModel', MailAddressesListModel)
.filter('MailAdsFilter', MailAdsFilter)
.filter('HouseNumberFilter', HouseNumberFilter)
.filter('DateRangeFilter', ['dateFilter', DateRangeFilter]);

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
    $scope.pageData = [];
    $scope.filter = null;
    MailAddressesListModel.GetMailAddressesList().then(function (data) {
        $scope.mailAddressesList = data.data;
        $scope.paginationData.totalItems = $scope.mailAddressesList.length;
        if ($scope.paginationData.totalItems > 0) {
            var max = $scope.mailAddressesList[0].HouseNumber;
            var min = $scope.mailAddressesList[0].HouseNumber;
            var minDate = $scope.mailAddressesList[0].CreationDate;
            $scope.mailAddressesList.forEach(function (item) {
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
            $scope.dateFilter.fromDate = minDate.slice(6, -2);
            $scope.dateFilter.untilDate = new Date();
            $scope.pageData = $scope.mailAddressesList.slice(0, $scope.paginationData.totalItems);
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

    $scope.paginationData = {
        maxSize: 5,
        itemsPerPage: 10,
        totalItems: 0,
        currentPage: 1,
        onPageChange: function () {
            $scope.pageData = $scope.mailAddressesList.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
        }
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