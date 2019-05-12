// VALIDATE FORM ENTRY

function validation(site,date,choice){
    var isValid = true;


    if(typeof(choice) === "undefined"){
        $("#radio-nested-4").next().text("Please Make A Selection!");
        isValid = false;

    }
    else if(choice!=="prior_run"){
     //   $("#radio-nested-4").next().text("*"); //clear the validation note if present.

        //alert("Choice is not prior run!");
        //if choice isn't equal to the prior run
        if(!(site==="KPHL" || site==="KDEN"||site==="KACY")){
            $("#SitePicker").next().text("Please enter a valid site ID!");
            isValid=false;

        }

    }
    else{
        if(!(site==="KPHL" || site==="KDEN"||site==="KACY")){
            $("#SitePicker").next().text("Please enter a valid site ID!");
            isValid=false;


        }
        if(date===""){
            //NOTE: User can break the app right now if they manually type in a bad date.
            $("#Early_Date").next().text("Please enter a date from within the past week.");
            isValid=false;
        }
        //if it is, date not required, no other tests currently needed but will have to expand this for further development.

    }
    if (isValid===true) {
        $("span").text('*'); //after passing validation, clear span values}
    }
    return isValid;





} // END validation
