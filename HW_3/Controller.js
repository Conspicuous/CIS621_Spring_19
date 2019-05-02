
$(document).ready(function () {
    let Name = $("#name").val().trim(); //Get rid of extra spaces before or after the name
    $("#message").load("ThankYou.html #TestAA"); //AJAX Load Call


    $("#name").val(Name); // Return


    // Depending on the TYPE of browser, do different things. SEE PAGE 300. Coding HTML5 can be dangerous for error checking.
   $("#contact").submit( //On Submit of the Page...
        function (evt) {


            let isValid = true; // By default, the form is valid on submission. variable init is NOT redundant. Without it, you can carry this over to certain if/else cases.

            isValid = validateForm();
            // Error check
            if (isValid === false) {
                evt.preventDefault(); //Don't submit
                validateForm(); //recursive call to reposition the text and to display error messages

                //$("#message").load("ThankYou.html #TestAA"); //AJAX Load Call
            }else{
                $("#formfield").addClass("hidden"); // hide class
                $("#ThankYouPage").removeClass("hidden"); //show thank you
                setTimeout()
                //$("#message").load("ThankYou.html #TestAA"); //AJAX Load Call

            } //End Else

        } // End Function

    ) // End Submit




}); //End Ready


//VALIDATION
function validateForm() {
    var valid = true;
//Check if required elements are filled in....

    //NAME

    var fullName = $("#name").val().trim();
    var fullNamePattern=/^[0-9]+/;
    if (fullName == "") {
        $("#name").next().text("This field is required.");
        valid = false;
    }else if(fullNamePattern.test(fullName)){
        $("#name").next().text("Please use roman numerals ex: (I, II, III) \n for numbers in your name.")

    } else {
        $("#name").next().text("");
    }
    $("#name").val(fullName);

    //error

    //EMAIL *Note, adapted from book Chapters 10, 14

    var email = $("#email").val().trim(); // trim whitespace characters
    // validate the email entry with a regular expression
    var emailPattern= /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

    if (email.length === 0) {
            $("#email").next().text("This field is required.");
            valid=false;
        } else if ( !emailPattern.test(email) ) {
            $("#email").next().text("Must be a valid email address. Did you forget a \".\" or an \"@\"? ");
           valid=false;

        } else {
            $("#email").next().text("");
            valid=true;

        }
    $("#email").val(email);












    //PHONE

    var phonePattern = /^\d{3}-\d{3}-\d{4}/;
    var phone = $("#phone").val().trim();
    if (phone.length === 0) {
        $("#phone").next().text("This field is required. Format: 555-555-5555");
        valid = false;
    } else if ( !phonePattern.test(phone) ) {
        $("#phone").next().text("Use 555-555-5555 format.");
        valid = false;
    } else {
        $("#phone").next().text("");
        valid=true;
    }
    $("#phone").val(phone);


    //Country
 //
    var countryPattern = /^[A-Za-z]{3,6}/;
    var country = $("#country").val().trim();
    if (country.length === 0) {
        $("#country").next().text("This field is required. Please use abbreviation.");
        valid = false;
    } else if ( !countryPattern.test(country) ) {
        $("#country").next().text("Did you use only letters? Please use 3-6 letters.");
        valid = false;
    } else {
        $("#country").next().text("");
        valid=true;
    }
    $("#country").val(country);

    //error

return valid;

} //END Function validateForm

function hasFormValidation() { // FROM: https://stackoverflow.com/questions/8550642/check-if-a-browser-has-built-in-html5-form-validation

    return (typeof document.createElement('input').checkValidity == 'function');

} // END Function hasFormValidation


function returnValidationError() {


} //End returnValidationError Function


