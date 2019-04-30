$(function () {


    var Sky_Conds = ["CL", "PC", "OC"];
    var dummy_Conditions = {
        high_Tmp: 72,
        low_Temp: 68,
        wnd_Spd: 15,
        wind_Dir: 270,
        sky_Cdtns: "Scattered",
        pop12: 15,
        qpf12: 0
    };

    $("#high_temp").text(dummy_Conditions.high_Tmp);
    $("#low_temp").text(dummy_Conditions.low_Temp);
    $("#wnd_speed").text(dummy_Conditions.wnd_Spd);
    $("#wnd_dir").text(dummy_Conditions.wind_Dir);
    $("#cld_cvr").text(dummy_Conditions.sky_Cdtns);
    $("#POP12").text(dummy_Conditions.pop12);
    $("#QPF12").text(dummy_Conditions.qpf12);


    $.ajax({
        url: "SiteListMOS.txt",
        dataType: "text",
        success: function(data) {
            var autoCompleteData = data.split('\n');
            $("#SitePicker").autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(autoCompleteData, request.term);
                    response(results.slice(0, 5)); // Display the first 5 results
                    $("#SitePicker").value(response); //Plug the value for the response
                }
            });
        }
    });


});
