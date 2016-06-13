function MailAddressesListModel($http) {
    var list = {};
    list.GetMailAddressesList = function () {
        return $http.get('/Data/GetMailAddressList');
    }
    return list;
};