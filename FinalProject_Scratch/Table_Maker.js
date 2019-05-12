//UPDATED MAKE TABLE USING PLOTLY

function Make_MOS_Single_Run_Table(container,data,dates){ //pulled container and data from original data table function

    // alert("In MAKE MOS");
    // alert(data);
    // alert(data.h_temp);
let values = [
    dates,data.h_temp,data.l_temp,data.windSpeed,data.windDir,data.POP24,data.QPF24];
//headers.unshift("Variable"); //Append Variable at beginning of array
let tbledata = [{
    type: 'table',
    header: {

        //values:[["Variable"],["High Temp"],["C"]], --> this took awhile to figure out. It's the space.
        values: [["Variable"],["HighT"], ["LowT"], ['WindS[Knots]'], ['WindDirection'],['POP24'],['QPF24']],
        align: ["left", "center"],
        line: {width: 1, color: '#506784'},
        fill: {color: '#119DFF'},
        font: {family: "Arial", size: 12, color: ["#121212"]}
    },
    cells: {
        values: values,
        align: ["left", "center"],
        line: {color: "#506784", width: 1},
        fill: {color: ['#25FEFD', 'white']},
        font: {family: "Arial", size: 11, color: ["#506784"]}
    }
}];
// alert("In PLOT");
// alert(tbledata);
// alert("container: "+container);
 Plotly.plot(container, tbledata);
//     let A={
//         HIGH_Temp:[1,2,3,4,5],
//         LOW_TEMP: [5,6,7,8,9]
//     };
//
//     var values = [
//         ['High Temp', 'Low Temp', 'Wind Speed', 'Wind Direction','POP 24'],[1,2,3,4,5],A.HIGH_Temp];
//
//     var tbledata = [{
//         type: 'table',
//         header: {
//             values:  [["<b>EXPENSES</b>"], ["<b>Q1</b>"],
//                 ["<b>Q2</b>"], ["<b>Q3</b>"], ["<b>Q4</b>"]],
//             align: ["left", "center"],
//             line: {width: 1, color: '#010108'},
//             fill: {color: '#ff1c26'},
//             font: {family: "Arial", size: 12, color: "white"}
//         },
//         cells: {
//             values: values,
//             align: ["left", "center"],
//             line: {color: "#84111b", width: 1},
//             fill: {color: ['#fe1a1f', 'white']},
//             font: {family: "Arial", size: 11, color: ["#000000"]}
//         }
//     }];
//
//     Plotly.plot("test_div", tbledata);

}