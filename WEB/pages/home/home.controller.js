$(document).ready(function () {
    //Get the code list and load it in the dropdown
    $.get("http://localhost:8092/VWIAPI/api/operation/codes", function (data) {
        $('#operationList').loadListData(data);
    });

    $('#loadForm').on('click', function(){
        $.get("http://localhost:8092/VWIAPI/api/operation/" + $('#operationList').val() + "/summery", function (sumData) {
            $.get("http://localhost:8092/VWIAPI/api/operation/" + $('#operationList').val() + "/detail", function (detailData) {
                $.each(detailData, function(i, val){
                    $('#attachment').prepend('<img id="theImg" src="data:image/png;base64,' + val.Col1Imageb + '" />');
                });
            });
        });
    });
});