app.controller('MailAddressesListCtrl', ['$scope', 'MailAddressesListModel', 'orderByFilter', 'mailAddressListFilterFilter', 'filterFilter', MailAddressesListCtrl])
.factory('MailAddressesListModel', MailAddressesListModel)
.filter('mailAddressListFilter', mailAddressListFilter)
.filter('dateRangeFilter', ['dateFilter', dateRangeFilter]);

function mailAddressListFilter() {
    return function (input, valueFrom, valueUntil, dateFrom, dateUntil) {
        return input.filter(function (item) {
            return (item.HouseNumber >= valueFrom) && (item.HouseNumber <= valueUntil) && (item.CreationDate.slice(6, -2) >= dateFrom) && (item.CreationDate.slice(6, -2) <= dateUntil);
        });
    };
};

function dateRangeFilter(dateFilter) {
    return function (input) {
        return dateFilter(input.dateFrom, 'dd.MM.yyyy') + "-" + dateFilter(input.dateUntil, 'dd.MM.yyyy');
    }
}

function MailAddressesListCtrl($scope, MailAddressesListModel, orderBy, mailAddressListFilter, filter) {
    $scope.mailAddressesList = null;
    $scope.filteredData = [];
    $scope.pageData = [];
    MailAddressesListModel.getMailAddressesList().then(function (data) {
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
                if (item.CreationDate.slice(6, -2) < minDate.slice(6, -2)) {
                    minDate = item.CreationDate;
                }
            });
            $scope.rangeData.min = $scope.rangeData.valueFrom = min;
            $scope.rangeData.max = $scope.rangeData.valueUntil = max;
            $scope.creationDateFilterData.dateFrom = minDate.slice(6, -2);
            $scope.creationDateFilterData.dateUntil = new Date();
            $scope.mailAddressesList = orderBy($scope.mailAddressesList, $scope.sortField, $scope.reverse);
            $scope.filteredData = $scope.mailAddressesList;
            $scope.pageData = $scope.filteredData.slice(0, $scope.paginationData.itemsPerPage);
        }
    }, function (error) {
        alert("Error! Can't get mail address list!");
    });

    $scope.onFilterChange = function () {
        $scope.filteredData = $scope.mailAddressesList;
        $scope.filteredData = mailAddressListFilter($scope.filteredData, $scope.rangeData.valueFrom, $scope.rangeData.valueUntil,
                                                    $scope.creationDateFilterData.dateFrom, $scope.creationDateFilterData.dateUntil);
        $scope.filteredData = filter($scope.filteredData, { Country: $scope.countryFilter, City: $scope.cityFilter, Street: $scope.streetFilter, Index: $scope.indexFilter });
        $scope.paginationData.totalItems = $scope.filteredData.length;
        $scope.paginationData.onPageChange();
    };

    $scope.creationDateFilterData = {
        dateFrom: undefined,
        dateUntil: undefined,
        onDateChange: function () {
            $scope.onFilterChange();
        }
    };

    $scope.houseNumberFilterData = {
        houseNumberFilter: undefined,
        onHouseNumberFilterChange: function () {
            var res = this.houseNumberFilter.split(/\s*-\s*/, 2);
            if (res.length > 0 && res[0]) {
                $scope.rangeData.valueFrom = parseInt(res[0]);
            } else {
                $scope.rangeData.valueFrom = $scope.rangeData.min;
            }
            if (res.length > 1 && res[1]) {
                $scope.rangeData.valueUntil = parseInt(res[1]);
            } else {
                $scope.rangeData.valueUntil = $scope.rangeData.max;
            }
            $scope.onFilterChange();
        }
    }; 

    $scope.rangeData = {
        valueFrom: 1,
        valueUntil: 999,
        min: 1,
        max: 999,
        onRangeChange: function () {
            $scope.houseNumberFilterData.houseNumberFilter = this.valueFrom + " - " + this.valueUntil;
            $scope.onFilterChange();
        }
    };

    $scope.paginationData = {
        maxSize: 5,
        itemsPerPage: 10,
        totalItems: 0,
        currentPage: 1,
        onPageChange: function () {
            $scope.pageData = $scope.filteredData.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        }
    };

    $scope.sortField = 'CreationDate';
    $scope.reverse = true;

    $scope.sort = function (fieldName) {
        $scope.reverse = (fieldName !== null && $scope.sortField === fieldName) ? !$scope.reverse : false;
        $scope.sortField = fieldName;
        $scope.filteredData = orderBy($scope.filteredData, $scope.sortField, $scope.reverse);
        $scope.paginationData.onPageChange();
    };
    $scope.isSortUp = function (fieldName) {
        return $scope.sortField === fieldName && !$scope.reverse;
    };
    $scope.isSortDown = function (fieldName) {
        return $scope.sortField === fieldName && $scope.reverse;
    };
};