app.controller('MailAddressesListCtrl', function ($scope, MailAddressesListModel) {
    $scope.mailAddressesList = null;
    MailAddressesListModel.GetMailAddressesList().then(function (data) {
        $scope.mailAddressesList = data.data;
    }, function (error) {
        alert("Error! Can't get mail address list!");
    });
})
.factory('MailAddressesListModel', MailAddressesListModel);
