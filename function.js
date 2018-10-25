// Load List Data
$.fn.loadListData = function (data) {
    this.each(function () {
        // only handle "Select Picker"
        if (false == $(this).hasClass("selectpicker")) {
            return; // do nothing
        }
        let element = $(this);
        let value = element.attr("value");
        let display = element.attr("display");
        for (var idx in data) {
            element.append('<option value=' + data[idx][display] + '>' + data[idx][display] + '</option>');
        }

        return $(this); // support chaining
    });
};