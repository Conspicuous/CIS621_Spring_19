"use strict";
/*
* JQUERY CODE
*
* List of books displayed beneath each heading
* If user clicks a link, the corresponding image for that book is displayed to the right
*   click event for link, click event for main headings
*
*Any time the user clicks the plus or minus sign, IMAGES no longer displayed
*
*
* The images referred to by href should be PRE LOADED->loop through all links of main element. Initial
 * Cancel default link
*
*
*
*
* Book suggests copy/pasting code from other apps. Use code from FAQs to start bc this is a good way to start
* coding new apps. This is accurate (make sure it's good code though!)
*
*
* (a) elements are the links
*
*
*
* */

$(function () {

    handleImgsClicked(); //Call Handler Function for Clicked Images
    prepareLinks();
    $("#image").attr("src", "");
}); // End Ready


function prepareLinks(){
    $("#categories h2").on("click", function (evt) {

        $(this).next().show(); // show the element.
        $(this).addClass("minus"); //add class minus to element
        $("#categories h2").not(this).next().hide(); // hide all not currently clicked elements
        $("#categories h2").not(this).removeClass("minus"); // Get rid of the class for other elements
        evt.preventDefault(); //cancel default action



    }); //end click



}



function handleImgsClicked() {
    $("#web_images a, #java_images a, #net_images a").each(function () { //this is using syntax of page 255 combined with using multiple attr selections concurrently
        var loadImages = new Image();
        loadImages.src = $(this).attr("href");


        // On event click
        $(this).on("click", function (evt) {
            $("#image").attr("src", loadImages.src);// #image == the ASIDE. SEE index.html.

            evt.preventDefault(); //Prevent Default Action
        }); //click

    }); //each
}





//p 255


//     }); // end click
// }); // end each

//
// }); //end ready


//VARIOUS ATTEMPTS
// $(this).toggleClass("minus");
// alert(this);
// if ($(this).attr("class") != "minus") {
//     $(this).next().hide();
//     alert("hide")
// }
// else {
//
//     $(this).next().show();
//     $("#categories h2").not(this).next().hide();
//     alert("not")
// }

//     // $('#categories h2').addClass("plus");
//     $('#categories h2').on('click', function (e) { // on click of h2
//
//         if ($(this).attr("class") != "minus") {
//             $(this).next().hide();
//         } else {
//             $(this).next().show();
//         }
//
//
//     }); //end click
//
// }); // end ready


