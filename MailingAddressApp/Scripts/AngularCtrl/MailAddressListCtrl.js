angular.module('MailingAddressApp')
.controller('MailAddressListCtrl', function ($scope, MailAddressService) {
    $scope.MailAddressList = [{ Country: "Russia", City: "Ulsk", Street: "Street", HouseNumber: 1, Index: "123456", CreationDate: 1465736400000 },
    { Country: "Russia2", City: "Ulsk2", Street: "Street2", HouseNumber: 1, Index: "123456", CreationDate: 1465736400000 },
    { Country: "Russia3", City: "Ulsk3", Street: "Street3", HouseNumber: 1, Index: "123456", CreationDate: 1465736400000 }];
    MailAddressService.GetMailAddressList().then(function (d) {
        $scope.MailAddressList = d.Data;
        alert(d.Data);
    }, function (error) {
        alert("Error! Can't get mail address list!");
    });
})
.factory('MailAddressService', function ($http) {
    var list = {};
    list.GetMailAddressList = function () {
        return $http.get('/Data/GetMailAddressList');
    }
    return list;
});
