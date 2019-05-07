"use strict";

$.getScript("Hard_Coded_MOS_Data_File.js").then(() => { //promise return (on success), arrow func syntax
    // alert("Hello 27");
    $(function () {

        //todo: local storage
        //todo: read json: https://stackoverflow.com/questions/17724017/using-jquery-to-build-table-rows-from-ajax-responsejson
        //todo: more than 1 date (one run)

        //todo: compare runs

        //Temporary Hard code (get to work first...)
        let MOS_MOS = new MEX_MOS("KPHL", 552019);
        MOS_MOS.generateFauxValues();


        let dummy_Conditions = { //temp
            high_Tmp: MOS_MOS.h_temp,
            low_Temp: MOS_MOS.l_temp,
            wnd_Spd: MOS_MOS.windSpeed,
            wind_Dir: MOS_MOS.windDir,

            pop24: MOS_MOS.POP24,
            qpf24: MOS_MOS.QPF24
        };


        // var dummy_conditions_Older = {high_Tmp: 70,
        //     low_Temp: 66,
        //     wnd_Spd: 12,
        //     wind_Dir: 250,
        //     sky_Cdtns: "Scattered",
        //     pop12: 2,
        //     qpf12: 0}
        // ;
        //
        // var dummy_Conditions_older_older = {
        //     high_Tmp: [70, 66, 73, 59, 66, 76, 72]};


        // $("#high_temp").text(dummy_Conditions.high_Tmp[0]); //CHANGE to row i= 1 to 6
        // $("#low_temp").text(dummy_Conditions.low_Temp[0]);
        // $("#wnd_speed").text(dummy_Conditions.wnd_Spd);
        // $("#wnd_dir").text(dummy_Conditions.wind_Dir);
        // $("#cld_cvr").text(dummy_Conditions.sky_Cdtns);
        // $("#POP12").text(dummy_Conditions.pop12);
        // $("#QPF12").text(dummy_Conditions.qpf12);

// AUTOCOMPLETE AJAX Call
        $.ajax({
            url: "SiteListMOS.txt",
            dataType: "text",
            success: function (data) {
                var autoCompleteData = data.split('\n');
                $("#SitePicker").autocomplete({
                    source: function (request, response) {
                        var results = $.ui.autocomplete.filter(autoCompleteData, request.term);
                        response(results.slice(0, 5)); // Display the first 5 results
                        $("#SitePicker").value(response); //Plug the value for the response

                    },
                    appendTo: $("#Site_Picker_Form")


                });
            }
        });


        $("#accordion").accordion({ //ACCORDION
            heightStyle: "content",
            collapsible: true, //allow the collapse of all panels (not default functionality)
            active: false // start collapsed

        }); // END Accordion



        var dummyDates = ["5/5/2019", "5/6/2019", "5/7/2019", "5/8/2019", "5/9/2019", "5/10/2019", "5/11/2019", "5/12/2019"];
        var data = [dummyDates, //headers
            dummy_Conditions.high_Tmp, dummy_Conditions.low_Temp, dummy_Conditions.wnd_Spd, dummy_Conditions.wind_Dir, dummy_Conditions.pop24, dummy_Conditions.qpf24
        ];

        makeTable($("#Current_Run"), data);

        function makeTable(container, data) {
            var table = $("<table/>").addClass('topazCells');
            $.each(data, function (rowIndex, r) {
                var row = $("<tr/>");
                $.each(r, function (colIndex, c) {
                    row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
                });
                table.append(row);
            });
            return container.append(table);
        }



        $("#Early_Date").datepicker({
            minDate: -7, // The minimum date to pick from is 7 days in the past (1 week)
            maxDate: -1 //The maximum date to pick from is yesterday
        });

    });// end ready
}); //end get Script



//todo: button to select Date--> gets the MOS run for that date, at bottom of page, visible if user is in correct part of accordion (use class)
// todo: Put in a calendar drop down menu


//todo: Current run: date insert

/*
*  function --> take in current date, and current local time
*  ---> May 1st 930pm
*  April 29th, 12Z, April 29th, 00Z. April 28th, 12Z. ...... .....
* return the 14 most recent runs based on the current date and time.
*
*
*
* */
