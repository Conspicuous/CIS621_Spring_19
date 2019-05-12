"use strict";

$.getScript("Hard_Coded_MOS_Data_File.js").then(() => { //promise return (on success), arrow func syntax
    // alert("Hello 27");
    $(function () {

        //ACCORDION
        $("#accordion").accordion({ //ACCORDION
            heightStyle: "content",
            collapsible: true, //allow the collapse of all panels (not default functionality)
            active: false // start collapsed

        }); // END Accordion

        // AUTOCOMPLETE AJAX Call
        $.ajax({
            url: "SiteListMOS.txt",
            dataType: "text",
            success: function (data) {
                var autoCompleteData = data.split('\n');
                $("#SitePicker").autocomplete({
                    source: function (request, response) {
                        var results = $.ui.autocomplete.filter(autoCompleteData, request.term);
                        response(results.slice(0, 2)); // Display the first 2 results
                        $("#SitePicker").value(response); //Plug the value for the response

                    },
                    appendTo: $("#Site_Picker_Form")


                });
            }
        });

        function makeTable(container, data) {
            //todo: clear table values
            var table = $("<table/>").addClass('topazCells');
            $.each(data, function (rowIndex, r) {
                var row = $("<tr/>");
                $.each(r, function (colIndex, c) {
                   // if(compare=false){}else{}
                    row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
                });
                table.append(row);
            });
            return container.append(table);
        } // Function to generate tables in the accordions as required. From stack exchange.


        function compareRuns(past_run, curr_run) {
            //

           // alert("The Difference Is: " + (new Date(curr_run.date).getDate() - new Date(past_run.date).getTime()));
            try {
                if (past_run === "" || past_run == null) throw "Past Run is empty! Traceback: MainController.js function compareRuns";
                if (curr_run === "" || curr_run == null) throw "Current Run is empty! Traceback: MainController.js function compareRuns";


                let curr_date = new Date().getTime(); //The current date...
                let past_date = new Date(past_run.date).getTime(); //The date of the past run...
                let date_difference = Math.floor((curr_date - past_date) / (86400000)); //1000 millseconds * 60 sec/min *60 min/hr *24 hrs/day (millseconds/millseconds per day = difference)

                if (date_difference <= 0) {
                    throw "Nothing to compare! The requested comparison date ranges do not overlap";
                } else {
                    // compute and return

                    //curr 5/7  [0 1 2 3 4 5 6]
                    //5/5 [-2 -1 0 1 2 3 4]
                    // comparison is change FROM old TO NEW. The NEW run IS X +/- vs the OLD. now 58, was 55. +3 new -old = value //shift index of old.

                    let change = {};
                    var keys = Object.keys(past_run);
                    keys.sort();
                    for (var i = 0; i < keys.length; i++) {
                        change[keys[i]] = [];
                        if (keys[i] !== "date" && keys[i] !== "location") { //don't care about those right now... + only one value
                            for (var j = 0; j < date_difference; j++) {
                                delete past_run[keys[i]][j]; //delete elements recursively
                                //alert(j);

                            }
                            for (var k = 0; k < past_run[keys[i]].length; k++) {

                                //const newArray = differences.filter( value => !Number.isNaN(value));

                                change[keys[i]].push(curr_run[keys[i]][k] - past_run[keys[i]][k]);

                            }

                            // Removes the first N dates for each variable, retains only the portion that is comparable.
                        }
                    } //End For

                    return change;


                } //end if/else --> replace with ternary


            } catch (err) {
                $("#ErrorNotification").text("Error: " + err + ".");
            }





        }

        let dates = (num_dates, PF = null, options = null, gdate = null) => {
            let result = [];
            let count = 0;


            if (PF === "P") {
                while (count < num_dates) {
                    let d = new Date();
                    d.setDate(d.getDate() - count);
                    if (count === 1) {
                        // alert(d.getMonth() + 1);
                    }

                    // alert(d.getMonth());
                    // let this_date= ("\""+(d.getMonth()+1<10 ? '0'+(d.getMonth()+1):(d+1))+ "/"+(d.getDate()<10 ? '0'+d.getDate(): d)  +"/" + d.getFullYear())+"\"";
                    let this_date = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d + 1)) + "/" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "/" + d.getFullYear();

                    result.push(this_date);
                    count++; // increment the count
                }
                return (result.join(',')); //return the results
            } //end if
            else if (options != null && gdate == null) {
                if ("future-1" === options) {
                    count++; //start count at 1
                    while (count < num_dates + 1) {
                        let d = new Date();
                        d.setDate(d.getDate() + count);


                        let this_date = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d + 1)) + "/" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "/" + d.getFullYear();

                        result.push(this_date);
                        count++; // increment the count
                    }
                    return (result.join(',')); //return the results

                }


            } else if (gdate != null) {
                //alert(gdate);
                // alert("gdate NOT Null: "+ new Date(gdate));
                let tdate = new Date(gdate).getTime();
                // alert("tdate is: " + tdate);
                if ("future-1" === options) {
                    count++; //start count at 1
                    while (count < num_dates + 1) {
                        let d = new Date(tdate);
                        // alert("tdate line 74: "+ tdate);
                        //alert("d line 75: "+d);
                        d.setDate(d.getDate() + count);
                        // alert("line 77: "+ d.setDate(d.getDate()+count));


                        let this_date = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d + 1)) + "/" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "/" + d.getFullYear();

                        result.push(this_date);
                        count++; // increment the count
                    }
                    return (result.join(',')); //return the results

                } else {
                    alert("Functionality of Main_Controller.js line 79 is not yet implemented!")
                }


            } else {
                while (count < num_dates) {
                    let d = new Date();
                    d.setDate(d.getDate() + count);


                    let this_date = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d + 1)) + "/" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + "/" + d.getFullYear();

                    result.push(this_date);
                    count++; // increment the count
                }
                return (result.join(',')); //return the results


            }


        };

        //FILL OUT CURRENT DATE INFO
        let today_is = dates(1); //what is today's date?
        $("#Selected_Run_Text").text("Single MOS Display Information. Today's Date: " + today_is);


        //todo: plot trend option.
        //todo: PHP
        //todo: server side
        //todo: read/parse data from NOAA
        //todo: create, host, auto-update, store database on AWS for the runs of the last 7 days
        //todo: MAV MOS
        //todo: update styling.
        //todo: local storage
        //todo: read json: https://stackoverflow.com/questions/17724017/using-jquery-to-build-table-rows-from-ajax-responsejson
        //todo: more than 1 date (one run)



        //Generate FAUX DATA for 7 days. Hard coded for now since this will be server side. *******
        let MOS_SITES = ["KPHL", "KACY", "KDEN"];
        let MOS_Array = [];
        let last_seven_days = dates(7, 'P').split(","); // LAST 7 days
        //alert(last_seven_days);
        for (var j = 0; j < MOS_SITES.length; j++) { //for each site
            for (let i = 0; i < 7; i++) { //generate 7 instances
                //alert(last_seven_days[i]);
                // alert(MOS_SITES[j]);
                var NEW_MOS = new MEX_MOS(MOS_SITES[j], last_seven_days[i]);
                NEW_MOS.generateFauxValues();
                // NEW_MOS.show();
                MOS_Array.push(NEW_MOS); //generate faux values run on create new instance before appending to array

            }

        }


        $("#Early_Date").datepicker({
            minDate: -7, // The minimum date to pick from is 7 days in the past (1 week)
            maxDate: -1 //The maximum date to pick from is yesterday
        });

        $("#reset_button").click(()=>{

            $("#Run_Comparison").empty();
            $("#Selected_Run").empty();
            $("#Selected_Run_Text").text("Current Run:");
            $("span").val("*");

            }



        )

        $('#submit_button').click(function (evt) { //On Submission of Form (Currently a click button)
            // Get all the forms elements and their values


            let Site = $("#SitePicker").val(); //Get Loc
            let Date = $("#Early_Date").val(); //Get Date

            let RequestedInformation = $('input:radio[name=radio-nested]:checked').val(); //Get Radio Group Choice
            // alert(Choice);
            // let values = $("#Site_Picker_Form").serialize();
           let validsubmit = validation(Site,Date,RequestedInformation);
           if(validsubmit===false){
               evt.preventDefault();
               validation(Site,Date,RequestedInformation);
           }
           $("span").val('*'); //after passing validation, clear span values

           // if(validsubmit===false){throw "Stopping"}
            switch (RequestedInformation) {

                case 'compare_run_to_curr_run': //Generate a comparison table set for all of the values. (format...)
                    //error validate
                    //alert("CurrentMOS show date: "+ MOS_Array[0].date);
                    // alert("Location of MOS_Array[5] is: " + MOS_Array[5].location);
                    // alert("Date of MOS_Array[5] is: " + MOS_Array[5].date);
                    // alert("High Temp of MOS_Array[5] is: "+ MOS_Array[5].h_temp);
                    let PAST_MOS = MOS_Array.find(obj => {
                        return obj.date === Date && obj.location === Site
                    }); //PAST MOS

                    let CURRENT_MOS = MOS_Array.find(obj => {
                        return obj.date = today_is && obj.location === Site
                    }); // CURRENT MOS
                    // return array of differences 0:[35 84 58]..1:[83 67 33]...ith:[1 2 3]
                    let differences = compareRuns(PAST_MOS, CURRENT_MOS); // compare the runs
                    $("#Run_Comparison").empty();
                    makeTable($("#Run_Comparison"), [differences.h_temp, differences.l_temp, differences.windSpeed, differences.windDir, differences.POP24, differences.QPF24]);
                    // 1 --> generate iteratively MEX MOS data. (generates 21 instances of mex mos). 7 runs, 3 sites. KPHL, KDEN, KACY.
                    // MY_ARRAY_OF_MEX_MOS = loop of MEX MOS for last 7 days.
                    // Compare current data, to the data requested...
                    // get the attributes from the requested INSTANCE of MEX_MOS, get the date, and then, pull only the indexes of the data for
                    //dates that are found in both runs.

                    break;
                case 'other_loc': // Compare the CURRENT run for two locations.
                    //NEED to add additional option for the other location to compare to.
                    //May also need to make this a future functionality
                    //todo: error validate
                    alert("Other location functionality is not yet enabled! Enjoy this picture of a giraffe!");
                    break;
                case 'Trend_Plot': //FUTURE-->Alert
                    alert("Trend Plot functionality is not yet enabled! Enjoy this picture of an Iguana!");
                    //todo: error validate
                    //todo: jquery image of Iguana
                    break;
                case 'prior_run': //Update the run menu on the top of the screen to a prior run

                    //todo: error validate
                    //todo: Update the text of the DOM element Current Run Text

                    if ($("#Selected_Run").val === "") { //default if no selected date

                        let CURRENT_MOS = MOS_Array.find(obj => {
                            return obj.date = today_is && obj.location === Site
                        }); // CURRENT MOS
                        // return array of differences 0:[35 84 58]..1:[83 67 33]...ith:[1 2 3]
                        $("#CurrRun_Text").text("Current Run: KPHL" + today_is + " 12Z");
                        //alert("In CURR MOS LINE 334");
                        //CURRENT_MOS.generateFauxValues();
                        let MEX_Conditions = { //temp
                            high_Tmp: CURRENT_MOS.h_temp,
                            low_Temp: CURRENT_MOS.l_temp,
                            wnd_Spd: CURRENT_MOS.windSpeed,
                            wind_Dir: CURRENT_MOS.windDir,
                            pop24: CURRENT_MOS.POP24,
                            qpf24: CURRENT_MOS.QPF24
                        }; // END MEX CONDITIONS OBJECT
                        //Get the NEXT 7 days, starting with TOMORROW.
                        //DEFAULT functionality...
                        let TheseDates = dates(8, null, "future-1").split(","); //calling code
                        let data = [TheseDates, //headers
                            MEX_Conditions.high_Tmp, MEX_Conditions.low_Temp, MEX_Conditions.wnd_Spd, MEX_Conditions.wind_Dir, MEX_Conditions.pop24, MEX_Conditions.qpf24
                        ];

                        $("#Selected_Run").empty();
                        alert("emptying line 352");
                        makeTable($("#Selected_Run"), data);

                    } else {
                        //alert("Else line 341");
                        $("#Selected_Run_Text").text("Past Run: " + Date + " 12Z");
                        let TheseDates = dates(8, null, "future-1", Date).split(","); //calling code


                        // alert("Line 278: "+ parseInt(Date));
                        //alert("Parse Int Line 280: " +parseInt(today_is));

                        // let requested_date = dates(1, null, "future-1", Date + " 20:00:00"); //want 5/7 for 5/6 GMT -4

                        let THIS_MOS = MOS_Array.find(obj => {
                            return obj.date === Date && obj.location === Site
                        });
                        alert("Line 354");
                        // let THIS_MOS = new MEX_MOS(Site, requested_date); //generate a fake MOS table for today's date!
                        // THIS_MOS.generateFauxValues();

                        // let MEX_Conditions_date = { //temp
                        //     high_Tmp: THIS_MOS.h_temp,
                        //     low_Temp: THIS_MOS.l_temp,
                        //     wnd_Spd: THIS_MOS.windSpeed,
                        //     wind_Dir: THIS_MOS.windDir,
                        //
                        //     pop24: THIS_MOS.POP24,
                        //     qpf24: THIS_MOS.QPF24
                        // };

                        // var data = [
                        //     [MEX_Conditions_date.high_Tmp], [MEX_Conditions_date.low_Temp], [MEX_Conditions_date.wnd_Spd], [MEX_Conditions_date.wind_Dir], [MEX_Conditions_date.pop24], [MEX_Conditions_date.qpf24]
                        // ];
                        // var data = [//headers
                        //     MEX_Conditions_date.high_Tmp, MEX_Conditions_date.low_Temp, MEX_Conditions_date.wnd_Spd, MEX_Conditions_date.wind_Dir, MEX_Conditions_date.pop24, MEX_Conditions_date.qpf24
                        // ];

                       // $("#Selected_Run").empty(); --> LESSON. FOR PLOTLY DON'T NEED EMPTY
                       // alert("Line 376");
                        //alert("Make single MOS SINGLE TABLE");
                        Make_MOS_Single_Run_Table("Selected_Run",THIS_MOS,TheseDates);
                       // alert("Tried to make it...");
                       // makeTable($("#Selected_Run"), data);


                    }


                    break;
                default:
                    //alert("toast");


            }

            // alert(values);
            //event.preventDefault();
            //alert("Hello 8")

        });

        //todo: Submit form, on submit, update the DOM
        // alert("Hello 1");
        //  $(".submit_button").click("submit",()=>{
        //
        //     // processRequest();
        //
        //      alert("Hello 2");
        //      //this.preventDefault();
        //      alert($("#Site_Picker_Form"));
        //      // validation().then(function(){
        //      //         //alert("Hello");
        //      //         //alert($("#Site_Picker_Form").serializeArray());
        //      //
        //      //     $("#Updated").text("I've changed!");
        //
        //
        //          } // end on fulfilled
        //
        //
        //      ); //end click


        // alert("Hello 3");


        // } //end function
        // ); //end on


        // $.ajax({
        //     type: "POST",
        //     url: "bin/process.php",
        //     data: dataString,
        //     success: function() {
        //         $('#contact_form').html("<div id='message'></div>");
        //         $('#message').html("<h2>Contact Form Submitted!</h2>")
        //             .append("<p>We will be in touch soon.</p>")
        //             .hide()
        //             .fadeIn(1500, function() {
        //                 $('#message').append("<img id='checkmark' src='images/check.png' />");
        //             });
        //     }
        // });
        // return false;
// alert("Hello 4");


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
