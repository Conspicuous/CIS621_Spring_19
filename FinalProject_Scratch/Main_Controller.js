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


    alert("hello");
//
// $("#SitePicker").autocomplete(
//     { source: var Sites=["KPHL","KBOS","PANC"]
//
//
//
//     }
//
//
// })

    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $("#SitePicker").autocomplete({
        source: availableTags
    });
});
