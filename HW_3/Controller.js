
$(document).ready(function () {
    let Name = $("#name").val().trim(); //Get rid of extra spaces before or after the name
    $("#message").load("ThankYou.html #TestAA"); //AJAX Load Call


    $("#name").val(Name); // Return


    // Depending on the TYPE of browser, do different things. SEE PAGE 300. Coding HTML5 can be dangerous for error checking.
    $("#contact").submit( //On Submit of the Page...
        function (evt) {
            // alert("Submitting...");
            //STEP ONE: Does the browser support HTML5 error checking? For this application, the usage is simple
            //and therefore we don't need jquery methods here...

            isValid = true; // By default, the form is valid on submission.

            isValid = validateForm();
            // Error check
            if (isValid === false) {
                evt.preventDefault(); //Don't submit
                validateForm(); //recursive call to reposition the text and to display error messages
                //$("#message").load("ThankYou.html #TestAA"); //AJAX Load Call
            }else{
               //  alert("true");
                $("#message").load("ThankYou.html #ThankYouBody"); //AJAX Load Call


               // window.location.href('http://localhost/ThankYou.html');
            }


        } // End Function


    ) // End Submit




}); //End Ready


//VALIDATION
function validateForm() {
    var valid = true;
//Check if required elements are filled in....

    //NAME

    var fullName = $("#name").val().trim();
    if (fullName == "") {
        $("#name").next().text("This field is required.");
        valid = false;
    } else {
        $("#name").next().text("");
    }
    $("#name").val(fullName);

    //error

    //EMAIL *Note, adapted from book Chapters 10, 14

    var email = $("#email").val().trim(); // trim whitespace characters
    // validate the email entry with a regular expression
    var emailPattern= /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
   // let parts = email.split("@"); //split email address at the @

    // var address= "(^[\\w!#$%&'*+/=?^´{|}~-]+(\\.[\\w!#$%&'*+/=?^´{|}~-]+)*$)";
    // var quotedText= "(^\"(([^\\\\\"])|
    //

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

       // // let parts = email.split("@"); //split email address at the @
       //  corr = true;
       //  switch (parts) {
       //      case parts.length !== 2:
       //          corr = false;
       //          break;
       //      case parts[0].length>50:
       //          corr = false;
       //          break;
       //      case parts[1].length>255:
       //          corr = false;
       //          break


        //
        // } //End Switch
        // if (!(corr)){return false;} //if the result of the switch is false...return false

// Keys: ()== substring, ^ = search for at start of string, extra slashes are used to escape special characters
        // Literal translation... substring 1: match at the start of the sequence, a sequence of characters that may include any number of repetitions,
        //and include the special characters ! # $ & % ' ´ =







    // if (emailCorrect($("#email"))) { // if true
    //     valid = true;
    //     alert(valid + ": Email Valid")
    // } else {
    //     valid = false;
    //     alert(valid + ": Email Invalid. Format Requirements: \n Maximum 50 characters before @ symbol, 1 @ symbol. ")
    // }

    //PHONE

    var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
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

    var Country = /^\d{3}-\d{3}-\d{4}$/;
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

    //error

return valid;

} //END Function validateForm

function hasFormValidation() { // FROM: https://stackoverflow.com/questions/8550642/check-if-a-browser-has-built-in-html5-form-validation

    return (typeof document.createElement('input').checkValidity == 'function');

} // END Function hasFormValidation


function returnValidationError() {


} //End returnValidationError Function


