function MailAddressesListModel($http) {
    var list = {};
    list.getMailAddressesList = function () {
        return $http.get('/Data/GetMailAddressList');
    }
    return list;
};