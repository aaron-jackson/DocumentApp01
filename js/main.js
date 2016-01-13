function uploadFiles(files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }
    formData.append(JSON.stringify);

    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.open('POST', 'imgs/uploads');
    xhr.onload = function() {
        if(xhr.status === 200) {
            $scope.alerts.push({type: 'sucess', msg: 'File uploaded!'});
        } else {
            $scope.alerts.push({type: 'danger', msg: 'Error! Something went wrong with the file uploader.'});
        }
    };
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
        }
    };
    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText)
            if (response.error != '') {
                $scope.alerts.push({type: 'danger', msg: 'Error! ' + ((typeof reponse.error.code !== 'undefined') ? reponse.error.code : response.error)});
            } else {
                $scope.$apply(function () {
                    $scope.file = response.result;
                });
            }
        }
    }
}
