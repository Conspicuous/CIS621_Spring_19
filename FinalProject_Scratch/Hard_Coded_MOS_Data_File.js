/* HARD CODED VALUES. Created a class which on deployment will be used for handling front end ops.
 *
  * Initially...for 2 MOS Sites, 12Z Runs **ONLY**, *3* days (2*3)= 6 sets to fill.
  *
  * Data structure decision--
  * Given future production rollout projected for this project inc database, need efficient large scale data struct
  *
  * */
//Also using to demonstrate the jquery function getScript to load and execute an external script, which
// can subsqeuntly be referenced. This allows us to retain modularity and separate code components for better readability.

//Does the class perform read in of file?

//MEX_MOS_Run_Data object instances are complete storage units for a single MOS-MEX run for a single location
/*Construction...
*
* Map
*
*Each time the constructor is called, randomly generate a mos table.
*
*Store this table in json file
*Try storing all at same time after.
* */

// alert("Hello 0");
class MOS_Run_Data {

    constructor(location, date) {
        //let Values = GenerateFauxValues;
        this.location = location; // 4 letter location identifer
        this.date = date; // Date of run UTC


    } // End Constructor


} //End Class

class MEX_MOS extends MOS_Run_Data {
    h_temp = [];
    l_temp = [];
    POP24 = [];
    windDir = [];
    windSpeed = [];
    QPF24 = [];

    //Default no constructor--> super(args)
    constructor(location, date, run_time = 12) {
        super(location, date);
        this.runTime = run_time;
    }

    show() {
        alert("The Date Is: " +this.date.toString());
    };

    generateFauxValues() { // Create Randomized MOS data for every instance uniquely!
        //alert("Hello");



        for (let i = 1; i < 8; i++) { // for days tomorrow through 7..
            this.POP24.push((i % 2 === 0) ? Math.round(Math.random() * (+100 - +60) + 60) : Math.round(Math.random() * (+35 - +15) + 15)); //ternary operator, even vs odd days.
            this.windDir.push((i % 2 === 0) ? Math.floor(Math.random() * (+360 - +0)) : Math.floor(Math.random() * (+270 - +90) + 90));
            this.h_temp.push(Math.round((Math.random() * (+79 - +62) + 62))); //high temp for day +1 (5/5 12z forecasts for 5/6 high and not 5/5)
            this.l_temp.push(Math.round(Math.min(Math.random() * (+60 - +49) + 49, this.h_temp[i - 1]))); //the low temp is the lower of either a random number between 70 and 49 or the randomly generated high temperature for that day.
            this.windSpeed.push(Math.round(Math.random() * (+20 - +1) + 1));
            this.QPF24.push(Math.round(Math.random() * (+5 - +0)));
        }

        //this.l_temp.push(49); //for 8th low temp (12z run), just make 49 to verify output.


    }; //End MEX_MOS


//error process


    // End constructor

    // GenerateFauxValues(){ //
    //
    //
    //     let QPF24= {};
    //
    //     QPF24["Day 1"]={id:1, value:0};
    //     QPF24["Day 2"]={id:2, value:2};
    //     QPF24["Day 3"]={id:3, value:0};
    //     QPF24["Day 4"]={id:4, value:5};
    //     QPF24["Day 5"]={id:5, value:0};
    //     QPF24["Day 6"]={id:6, value:1};
    //     QPF24["Day 7"]={id:7, value:0};
    //     this.QPF24 =QPF24;
    //
    //   for (let i = 1; i<7; i++){ // for days
    //       POP24.push( (i%2===0) ? Math.round(Math.random() * (+100 - +60)+60):Math.round(Math.random()*(+35- +15)+15)); //ternary operator, even vs odd days.
    //       windDir.push(i%2===0) ? Math.floor(Math.random()*(+360 - +0)):Math.floor(Math.random()*(+270- +90)+90);
    //       h_temp_PHL.push(Math.floor((Math.random()*(+76 - +62)+ 62))); //high temp for day +1 (5/5 12z forecasts for 5/6 high and not 5/5)
    //       l_temp_PHL.push(Math.floor(Math.max(Math.random()*(+70 - +49)+49,h_temp_PHL[i-1]))); //the low temp is the larger of either a random number between 70 and 49 or the randomly generated high temperature for that day.
    //       windSpeed.push(Math.floor(Math.random()*(+20 - +1)+1));
    //   }
    //
    //       this.POP24=POP24;
    //
    //   //for a 12z run, there are 8 lows and 7 highs
    //   l_temp_PHL.push(Math.floor(Math.random()*(+70 - +49)+49));
    //
    //
    //   return [POP24, windDir,h_temp_PHL,l_temp_PHL,windSpeed]; }


} //End class


//let S_h_temp_PHL = 63; //Degrees F, Starting High Temp PHL
// let S_l_temp_PHL = 56;
// let S_windSpeed = 10;
//let S_windDir = 0;
/*  The wind direction (WDIR) forecasts are coded as two digits, in units of tens of degrees measured clockwise from true north (01 = 10° to 36 = 360°); calm conditions are coded "00".
*The two-digit wind speed (WSPD) forecasts are given to the nearest knot, with a maximum speed of 98 knots; calm conditions are coded "00".
   * Missing WDIR and WSPD forecasts are coded as "99". */

//let S_POP_24 = 80;

//Generate random POP values...even days between 80 and 100% prob, odd days 15 to 35% prob
//let Fake_MEX_MOS_Values=generateFauxValues(); //Generate Faux MOS Values!
//let POP24 = [];
//let h_temp_PHL =[];
//let h_temp_DEN =[];
//let l_temp_PHL = [];
//let l_temp_DEN = [];
//let windSpeed = [];
//let windDir = [];


// function generateFauxValues(){
//
//
//     for (let i = 1; i<7; i++){ // for days
//         POP24.push( (i%2===0) ? Math.round(Math.random() * (+100 - +60)+60):Math.round(Math.random()*(+35- +15)+15)); //ternary operator, even vs odd days.
//         windDir.push(i%2===0) ? Math.floor(Math.random()*(+360 - +0)):Math.floor(Math.random()*(+270- +90)+90);
//         h_temp_PHL.push(Math.floor((Math.random()*(+76 - +62)+ 62))); //high temp for day +1 (5/5 12z forecasts for 5/6 high and not 5/5)
//         l_temp_PHL.push(Math.floor(Math.max(Math.random()*(+70 - +49)+49,h_temp_PHL[i-1]))); //the low temp is the larger of either a random number between 70 and 49 or the randomly generated high temperature for that day.
//         windSpeed.push(Math.floor(Math.random()*(+20 - +1)+1));
//     }
//
//     //for a 12z run, there are 8 lows and 7 highs
//     l_temp_PHL.push(Math.floor(Math.random()*(+70 - +49)+49));
//
//
//     return [POP24, windDir,h_temp_PHL,l_temp_PHL,windSpeed];
//
//
//
// } // End Function Generate Faux Values


//For demo, the QPF values will remain constant across sites.
// let QPF24= {};
//
// QPF24["Day 1"]={id:1, value:0};
// QPF24["Day 2"]={id:2, value:2};
// QPF24["Day 3"]={id:3, value:0};
// QPF24["Day 4"]={id:4, value:5};
// QPF24["Day 5"]={id:5, value:0};
// QPF24["Day 6"]={id:6, value:1};
// QPF24["Day 7"]={id:7, value:0};


// let MOS_KPHL_5_5 = new MEX_MOS_Run_Data("KPHL",552019,h_temp_PHL,l_temp_PHL,windSpeed,windDir,POP24,QPF24);
// let MOS_KPHL_5_5 = new MEX_MOS("KPHL",552019);
//
// let MOS_KPHL_5_4 = new MEX_MOS("KPHL",542019);
// let MOS_KPHL_5_3 = new MEX_MOS("KPHL",532019);
// let MOS_KPHL_5_2 = new MEX_MOS("KPHL",522019);
// let MOS_KPHL_5_1 = new MEX_MOS("KPHL",512019);
// let MOS_KPHL_4_30 = new MEX_MOS("KPHL",4302019);
// let MOS_KPHL_4_29 = new MEX_MOS("KPHL",4292019);


//todo: Iterate through MOS
//********
//let Dummy_MEX_Instances = [MOS_KPHL_5_5,MOS_KPHL_5_4,MOS_KPHL_5_3, MOS_KPHL_5_2,MOS_KPHL_5_1,MOS_KPHL_4_30,MOS_KPHL_4_29];
// MOS_KPHL_4_29.generateFauxValues();
// MOS_KPHL_4_29.show();
//********


// let MOS_KDEN_5_5 = new MEX_MOS();
// let MOS_KDEN_5_4 = new MEX_MOS();
// let MOS_KDEN_5_3 = new MEX_MOS();
// let MOS_KDEN_5_2 = new MEX_MOS();
// let MOS_KDEN_5_1 = new MEX_MOS();
// let MOS_KDEN_4_30 = new MEX_MOS();
// let MOS_KDEN_4_29 = new MEX_MOS();


// let MOS_KWWD_5_5 = new MEX_MOS();
// let MOS_KWWD_5_4 = new MEX_MOS();
// let MOS_KWWD_5_3 = new MEX_MOS();
// let MOS_KWWD_5_2 = new MEX_MOS();
// let MOS_KWWD_5_1 = new MEX_MOS();
// let MOS_KWWD_4_30 = new MEX_MOS();
// let MOS_KWWD_4_29 = new MEX_MOS();

//todo: local storage JSON file...

// try {
//     localStorage["MOSHardCode"]=JSON.stringify(MOS_KPHL_4_29);
//     alert("trying");
//
// } catch (e) {
//     alert("catching");
// }