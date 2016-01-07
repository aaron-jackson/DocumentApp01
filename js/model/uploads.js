var uploadSortable = angular.module('uploadSortable', ['ui.sortable']);

uploadSortable.controller('uploadSortableController', function($scope) {
    var fileList = [];

    for(var i = 1; i <= 5; i++ ) {
        fileList.push({
            text: 'File ' + i,
            value: i
        });
    }

    $scope.list = fileList;

    $scope.sortingLog = [];

    $scope.sortableOptions = {
        update: function(e, ui) {
            var logEntry = fileList.map(function(i) {
                return i.value;
            }).join(', ');
            $scope.sortingLog.push('Stop: ', + logEntry);
        },
        stop: function(e, ui) {
            var logEntry = fileList.map(function(i) {
                return i.value;
            }).join(', ');
            $scope.sortingLog.push('Stop: ' + logEntry);
        }
    };
});
