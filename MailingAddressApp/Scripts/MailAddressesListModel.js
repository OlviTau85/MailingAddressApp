function MailAddressesListModel($http) {
    var list = {};
    list.getMailAddressesList = function () {
        return $http.get('/Data/GetMailAddressList/1');
    }
    return list;
};