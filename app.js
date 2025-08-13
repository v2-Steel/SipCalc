var resultDist = []

document.getElementById("one").addEventListener("click", () => {
    document.getElementById("fileInput1").click();
});
document.getElementById("two").addEventListener("click", () => {
    document.getElementById("fileInput2").click();
});
document.getElementById("three").addEventListener("click", () => {
    document.getElementById("fileInput3").click();
});
document.getElementById("four").addEventListener("click", () => {
    document.getElementById("fileInput4").click();
});
document.getElementById("five").addEventListener("click", () => {
    document.getElementById("fileInput5").click();
});
document.getElementById("six").addEventListener("click", () => {
    document.getElementById("fileInput6").click();
});

document.getElementById("fileInput1").addEventListener("change", () => handleFileUpload(1));
document.getElementById("fileInput2").addEventListener("change", () => handleFileUpload(2));
document.getElementById("fileInput3").addEventListener("change", () => handleFileUpload(3));
document.getElementById("fileInput4").addEventListener("change", () => handleFileUpload(4));
document.getElementById("fileInput5").addEventListener("change", () => handleFileUpload(5));
document.getElementById("fileInput6").addEventListener("change", () => handleFileUpload(6));

function handleFileUpload(index) {
    switch (index) {
        case 1:
            document.getElementById("one").style.marginTop = "1vw";
            document.getElementById("pdfChart1").style.display = "block";
            fileUploaded(1);
            break;
        case 2:
            document.getElementById("two").style.marginTop = "1vw";
            document.getElementById("pdfChart2").style.display = "block";
            fileUploaded(2);
            break;
        case 3:
            document.getElementById("three").style.marginTop = "1vw";
            document.getElementById("pdfChart3").style.display = "block";
            fileUploaded(3);
            break;
        case 4:
            document.getElementById("four").style.marginTop = "1vw";
            document.getElementById("pdfChart4").style.display = "block";
            fileUploaded(4);
            break;
        case 5:
            document.getElementById("five").style.marginTop = "1vw";
            document.getElementById("pdfChart5").style.display = "block";
            fileUploaded(5);
            break;
        case 6:
            document.getElementById("six").style.marginTop = "1vw";
            document.getElementById("pdfChart6").style.display = "block";
            fileUploaded(6);
            break;
        default:
            console.warn(`No handler defined for fileInput${index}`);
    }
}

document.getElementById("chanceInput").addEventListener("change", () => {
    let num = document.getElementById("chanceInput").value
    numGreater = 0;
    for(let i = 0; i<resultDist.length; i++){
        if(eval(resultDist[i] + cowSign + num)){
            numGreater++;
        }
    }
    let percent = numGreater/resultDist.length * 100
    document.getElementById("chanceOut").innerHTML =  percent.toFixed(2) + "%"
})

var leftCount = 0;
var cowSign = ">";

document.getElementById("cowBtn").addEventListener("click", () => {
    if(leftCount % 2 == 0){
        document.getElementById("cowDrop").style.left = "79vw";
    } else{
        document.getElementById("cowDrop").style.left = "70vw"
    }
    leftCount++;
    document.getElementById("chanceDiv").style.opacity = "1";
})

var numberStore = 0;
var distStorage = {}
var chartList = {}
var chartTitles = {}
var numBins = 20

function fileUploaded(num) {
    event.preventDefault();
    var file_to_read = document.getElementById("fileInput" + num).files[0];
    var fileread = new FileReader();
    fileread.onload = function (e) {
        var str = e.target.result;
        var parsed = JSON.parse(str);
        distStorage[num.toString()] = parsed;
        let name = parsed["sips"][0]["name"];
        document.getElementById("name" + num).innerHTML = name;
        document.getElementById("name" + num).style.opacity = "1";
        chartTitles[num.toString()] = name
        var func = parsed["sips"][0]["function"]
        var labels = []
        var density = []
        if (func == "SIP_Array") {
            var resultValues = parsed["sips"][0]["arguments"]["value"]
            let max = Math.max(...resultValues)
            for (let i = 0; i < numBins; i++) {
                density.push(max)
            }
            for (let i = 0; i < numBins; i++) {
                labels.push(i)
            }
            const cfg = {
                type: "bar",
                data: {
                    labels: labels, //X-axis labels
                    datasets: [{
                        data: density, //Y-axis values
                        backgroundColor: 'rgba(37, 93, 150, 1)'
                    }]
                },
                options: {
                    title: {
                        text: name,
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: false
                            },
                            ticks: {
                                min: 0,
                                max: max,
                                display: false,
                            }
                        }],
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: 0,
                                max: 100,
                                maxTicksLimit: 5,
                            },
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    tooltips: {enabled: false},
                    hover: {mode: null},
                }
            }
            chartList[num.toString()] = cfg
            var myChart = document.getElementById('pdfChart' + num);
            let chart1 = new Chart(myChart, cfg)

        } else {
            density = parsed["sips"][0]["metadata"]["density"];
            for (let i = 0; i < numBins; i++) {
                labels.push(i)
            }
            const cfg = {
                type: "bar",
                data: {
                    labels: labels, //X-axis labels
                    datasets: [{
                        data: density, //Y-axis values
                        backgroundColor: 'rgba(37, 93, 150, 1)'
                    }]
                },
                options: {
                    title: {
                        text: name,
                        display: false
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: false
                            },
                            ticks: {
                                display: false,
                            }
                        }],
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: 0,
                                max: 100,
                                maxTicksLimit: 5,
                            },
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    tooltips: {enabled: false},
                    hover: {mode: null},
                }
            }
            chartList[num.toString()] = cfg
            var myChart = document.getElementById('pdfChart' + num);
            let chart1 = new Chart(myChart, cfg)
        }
    }
    fileread.readAsText(file_to_read);
}

$('.cowSign').click(function () {
    let sign = $(this).data("sign")
    if (sign == "avg"){
        document.getElementById("cowSymb").innerHTML = "Avg"
        document.getElementById("chanceInput").style.display = "none";
        // Calculate and display the average of resultDist
        if (resultDist.length > 0) {
            let sum = resultDist.reduce((a, b) => a + b, 0);
            let avg = sum / resultDist.length;
            document.getElementById("chanceOut").innerHTML = avg.toFixed(4);
        } else {
            document.getElementById("chanceOut").innerHTML = "N/A";
        }
    } else{
        document.getElementById("chanceInput").style.display = "";
        if(sign == "gt"){
            document.getElementById("cowSymb").innerHTML = ">"
            cowSign = ">"
        }
        if(sign == "lt"){
            document.getElementById("cowSymb").innerHTML = "<"
            cowSign = "<"
        }
        if(sign == "ge"){
            document.getElementById("cowSymb").innerHTML = "≥"
            cowSign = ">="
        }
        if(sign == "le"){
            document.getElementById("cowSymb").innerHTML = "≤"
            cowSign = "<="
        }
        if(sign == "eq"){
            document.getElementById("cowSymb").innerHTML = "="
            cowSign = "=="
        }

        let num = document.getElementById("chanceInput").value
        numGreater = 0;
        for(let i = 0; i<resultDist.length; i++){
            if(eval(resultDist[i] + cowSign + num)){
                numGreater++;
            }
        }
        let percent = numGreater/resultDist.length * 100
        document.getElementById("chanceOut").innerHTML =  percent.toFixed(2) + "%"
    }
})

$('.keys').click(function () {
    var ansChart = document.getElementById('chart3');
    var chart1 = document.getElementById('chart1');
    var chart2 = document.getElementById('chart2');
    let action = $(this).data("action")
    let num = $(this).data("num")
    var chartVar1;
    var chartVar2;
    numberStore = document.getElementById("numberStore").value
    // if you clicked a key
    if (!action) {
        // Check if we have a complete calculation (both operands and operator are set)
        let firstDist = $('#gridContainer').data('firstdist')
        let operator = $('#gridContainer').data('operator')
        let secondDist = $('#gridContainer').data('seconddist')
        
        // If we have a complete calculation, start fresh with the new distribution
        if (firstDist && operator && secondDist) {
            // Clear the display
            document.getElementById("chartHolder1").style.display = "none"
            document.getElementById("chartHolder2").style.display = "none"
            document.getElementById("numHolder1").style.display = "none"
            document.getElementById("numHolder2").style.display = "none"
            document.getElementById("displayName1").innerHTML = ""
            document.getElementById("displayName2").innerHTML = ""
            document.getElementById('operator').innerHTML = ""
            document.getElementById('equal').innerHTML = ""
            document.getElementById('chainedOperator').innerHTML = ""
            document.getElementById('chainedOperator').style.display = "none"
            
            // Reset calculator state
            $('#gridContainer').data('firstdist', 0)
            $('#gridContainer').data('seconddist', 0)
            $('#gridContainer').data('operator', 'add')
            $('#gridContainer').data('previouskeytype', 'graph')
            $('#gridContainer').data('lastposition', 'none')
            $('#gridContainer').data('chained', false)
            $('#gridContainer').data('chainedOperator', '')
            $('#gridContainer').data('previousResult', null)
            
            // Put the new distribution in the first position
            $('#gridContainer').data('firstdist', num);
            $('#gridContainer').data('lastposition', 'first');
            if(num == 8){
                document.getElementById("chartHolder1").style.display = "none"
                document.getElementById("numHolder1").style.display = "flex"
                document.getElementById("numHolder1").innerHTML = numberStore
            } else{
                document.getElementById("numHolder1").style.display = "none"
                document.getElementById("chartHolder1").style.display = "flex"
                chartVar1 = new Chart(chart1, chartList[num.toString()])
                if(num == 7){
                    document.getElementById("displayName1").innerHTML = "Previous Result"
                } else{
                    document.getElementById("displayName1").innerHTML = chartTitles[num.toString()]
                }
            }
            document.getElementById("displayName1").style.opacity = "1"
        } else if($('#gridContainer').data('previouskeytype') == "graph"){
            $('#gridContainer').data('firstdist', num);
            $('#gridContainer').data('lastposition', 'first');
            if(num == 8){
                document.getElementById("chartHolder1").style.display = "none"
                document.getElementById("numHolder1").style.display = "flex"
                document.getElementById("numHolder1").innerHTML = numberStore
            } else{
                document.getElementById("numHolder1").style.display = "none"
                document.getElementById("chartHolder1").style.display = "flex"
                chartVar1 = new Chart(chart1, chartList[num.toString()])
                if(num == 7){
                    document.getElementById("displayName1").innerHTML = "Previous Result"
                } else{
                    document.getElementById("displayName1").innerHTML = chartTitles[num.toString()]
                }
            }
            document.getElementById("displayName1").style.opacity = "1"
        } else if($('#gridContainer').data('previouskeytype') == "operator") {
            $('#gridContainer').data('seconddist', num);
            $('#gridContainer').data('lastposition', 'second');
            if(num == 8){
                document.getElementById("chartHolder2").style.display = "none"
                document.getElementById("numHolder2").style.display = "flex"
                document.getElementById("numHolder2").innerHTML = numberStore
            } else{
                document.getElementById("numHolder2").style.display = "none"
                document.getElementById("chartHolder2").style.display = "flex"
                chartVar2 = new Chart(chart2, chartList[num.toString()])
                if(num == 7){
                    document.getElementById("displayName2").innerHTML = "Previous Result"
                } else{
                    document.getElementById("displayName2").innerHTML = chartTitles[num.toString()]
                }
            }
            document.getElementById("displayName2").style.opacity = "1"

            // calculation starts
            document.getElementById('equal').innerHTML = "="
            firstDist = $('#gridContainer').data('firstdist')
            operator = $('#gridContainer').data('operator')
            secondDist = $('#gridContainer').data('seconddist')
            
            // Check if we're in chained calculation mode
            let isChained = $('#gridContainer').data('chained')
            let chainedOperator = $('#gridContainer').data('chainedOperator')
            let previousResult = $('#gridContainer').data('previousResult')
            
            if (isChained && previousResult) {
                // We're doing a chained calculation
                let subResultDensity;
                
                if (operator === "by") { // for scatterplot
                    scatterCfg = scatterplot(firstDist, secondDist)
                    // For chained scatter, we'll just show the scatter result
                    const ansChart = document.getElementById('chart3');
                    if (ansChart && ansChart.chart) {
                        ansChart.chart.destroy();
                    }
                    ansChart.width = ansChart.width;
                    let chart3 = new Chart(ansChart, scatterCfg);
                    ansChart.chart = chart3;
                    document.getElementById("answerTitle").style.display = "none";
                    chartList["7"] = scatterCfg;
                } else { // for arithmetic
                    // Calculate the sub-calculation first
                    subResultDensity = calculate(firstDist, operator, secondDist)
                    
                    // Now combine with the previous result using the chained operator
                    let finalResultDensity;
                    if (chainedOperator === "+") {
                        finalResultDensity = previousResult.map((val, i) => val + subResultDensity[i]);
                    } else if (chainedOperator === "-") {
                        finalResultDensity = previousResult.map((val, i) => val - subResultDensity[i]);
                    } else if (chainedOperator === "x") {
                        finalResultDensity = previousResult.map((val, i) => val * subResultDensity[i]);
                    } else if (chainedOperator === "÷") {
                        finalResultDensity = previousResult.map((val, i) => val / subResultDensity[i]);
                    }
                    
                    // Update resultDist with the final chained result
                    resultDist = finalResultDensity;
                    
                    // Create the final result chart
                    let minVal = Math.min(...finalResultDensity);
                    let secondMax = Math.max(...finalResultDensity);
                    
                    function findBetterMax(values){
                        let valuesCopy = [...values];
                        for(let i = 0; i < 40; i++){
                            let maxVal = Math.max(...valuesCopy)
                            let index = valuesCopy.indexOf(maxVal)
                            valuesCopy.splice(index, 1)
                        }
                        return Math.max(...valuesCopy)
                    }
                    
                    let betterMax = findBetterMax(finalResultDensity);
                    let binSize = (betterMax - minVal)/15;
                    let bins = [];
                    let histogram = [];
                    
                    let current = minVal;
                    for (let i = 0; i <= numBins; i++) {
                        bins.push(current.toFixed(4))
                        current += binSize;
                        histogram.push(0)
                    }
                    
                    for(let i = 0; i<finalResultDensity.length; i++){
                        for(let j = 1; j<numBins+1; j++){
                            if(finalResultDensity[i] <= bins[j]){
                                histogram[j]++;
                                break;
                            }
                        }
                    }
                    
                    const resultcfg = {
                        type: "bar",
                        data: {
                            labels: bins,
                            datasets: [{
                                data: histogram,
                                backgroundColor: 'rgba(37, 93, 150, 1)'
                            }]
                        },
                        options: {
                            title: {
                                text: "Chained Result",
                                display: false
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false,
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        min: Math.min(...finalResultDensity),
                                        max: Math.max(...finalResultDensity),
                                        maxTicksLimit: 5,
                                        display: false
                                    },
                                }]
                            },
                            elements: {
                                point: {
                                    radius: 0
                                }
                            },
                            tooltips: {enabled: false},
                            hover: {mode: null},
                        }
                    }
                    
                    let chart3 = new Chart(ansChart, resultcfg)
                    document.getElementById("answerTitle").style.display = "none";
                    chartList["7"] = resultcfg
                }
                
                // Clear chained mode
                $('#gridContainer').data('chained', false);
                $('#gridContainer').data('chainedOperator', '');
                $('#gridContainer').data('previousResult', null);
                document.getElementById('chainedOperator').style.display = "none";
                
            } else {
                // Normal calculation (not chained)
                if (operator === "by") { // for scatterplot
                    scatterCfg = scatterplot(firstDist, secondDist)
                    
                    // Render in chart3
                    const ansChart = document.getElementById('chart3');
                    // Clear previous chart if any
                    if (ansChart && ansChart.chart) {
                        ansChart.chart.destroy();
                    }
                    // Chart.js v2/v3 compatibility: clear and re-create
                    ansChart.width = ansChart.width; // reset canvas
                    let chart3 = new Chart(ansChart, scatterCfg);
                    ansChart.chart = chart3;
                    document.getElementById("answerTitle").style.display = "none";
                    chartList["7"] = scatterCfg;
                } else { // for arithmetic
                    let resultDensity = calculate(firstDist, operator, secondDist)
        
                    let minVal = Math.min(... resultDensity)
                    let secondMax = Math.max(...resultDensity)
        
                    function findBetterMax(values){
                        // Create a copy to avoid mutating the original array
                        let valuesCopy = [...values];
                        for(let i = 0; i < 40; i++){
                            let maxVal = Math.max(...valuesCopy)
                            index = valuesCopy.indexOf(maxVal)
                            valuesCopy.splice(index, 1)
                        }
                        return Math.max(...valuesCopy)
                    }

                    densityHolder = resultDensity
        
                    secondMax = findBetterMax(densityHolder)
        
                    let binSize = (secondMax - minVal)/15
                    var bins = []
                    var histogram = []
        
                    current = minVal
                    for (let i = 0; i <= numBins; i++) {
                        bins.push(current.toFixed(4))
                        current += binSize;
                        histogram.push(0)
                    }
        
                    for(let i = 0; i<resultDensity.length; i++){
                        for(let j = 1; j<numBins+1; j++){
                            if(resultDensity[i] <= bins[j]){
                                histogram[j]++;
                                break;
                            }
                        }
                    }
        
                    const resultcfg = {
                        type: "bar",
                        data: {
                            labels: bins, //X-axis labels
                            datasets: [{
                                data: histogram, //Y-axis values
                                backgroundColor: 'rgba(37, 93, 150, 1)'
                            }]
                        },
                        options: {
                            title: {
                                text: "PDF Chart",
                                display: false
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: false
                                    },
                                    ticks: {
                                        display: false,
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        min: Math.min(...resultDensity),
                                        max: Math.max(...resultDensity),
                                        maxTicksLimit: 5,
                                        display: false
                                    },
                                }]
                            },
                            elements: {
                                point: {
                                    radius: 0
                                }
                            },
                            tooltips: {enabled: false},
                            hover: {mode: null},
                        }
                    }
        
                    let chart3 = new Chart(ansChart, resultcfg)
                    document.getElementById("answerTitle").style.display = "none";
                    chartList["7"] = resultcfg
                                }
            }
        }
        $('#gridContainer').data('previouskeytype', "graph");
    }

    if (action === 'add'){
        // Check if we're chaining from a result
        if($('#gridContainer').data('lastposition') == "second") {
            // Start chained calculation mode
            $('#gridContainer').data('chained', true);
            $('#gridContainer').data('chainedOperator', '+');
            $('#gridContainer').data('previousResult', resultDist);
            
            // Show chained operator on the left
            document.getElementById('chainedOperator').innerHTML = "+";
            document.getElementById('chainedOperator').style.fontSize = "2em";
            document.getElementById('chainedOperator').style.display = "flex";
            
            // Clear the display for new calculation
            document.getElementById("chartHolder1").style.display = "none";
            document.getElementById("chartHolder2").style.display = "none";
            document.getElementById("numHolder1").style.display = "none";
            document.getElementById("numHolder2").style.display = "none";
            document.getElementById("displayName1").innerHTML = "";
            document.getElementById("displayName2").innerHTML = "";
            document.getElementById('operator').innerHTML = "";
            document.getElementById('equal').innerHTML = "";
            
            // Reset calculator state for new calculation
            $('#gridContainer').data('firstdist', 0);
            $('#gridContainer').data('seconddist', 0);
            $('#gridContainer').data('operator', 'add');
            $('#gridContainer').data('previouskeytype', 'graph');
            $('#gridContainer').data('lastposition', 'none');
        } else {
            // Normal operator behavior
            document.getElementById('operator').style.fontSize = "2em";
            document.getElementById('operator').innerHTML = "+"
            $('#gridContainer').data('previouskeytype', "operator");
            $('#gridContainer').data('operator', "+");
            $('#gridContainer').data('lastposition', "operator");
        }
    }
    if (action === 'minus'){
        // Check if we're chaining from a result
        if($('#gridContainer').data('lastposition') == "second") {
            // Start chained calculation mode
            $('#gridContainer').data('chained', true);
            $('#gridContainer').data('chainedOperator', '-');
            $('#gridContainer').data('previousResult', resultDist);
            
            // Show chained operator on the left
            document.getElementById('chainedOperator').innerHTML = "-";
            document.getElementById('chainedOperator').style.fontSize = "2em";
            document.getElementById('chainedOperator').style.display = "flex";
            
            // Clear the display for new calculation
            document.getElementById("chartHolder1").style.display = "none";
            document.getElementById("chartHolder2").style.display = "none";
            document.getElementById("numHolder1").style.display = "none";
            document.getElementById("numHolder2").style.display = "none";
            document.getElementById("displayName1").innerHTML = "";
            document.getElementById("displayName2").innerHTML = "";
            document.getElementById('operator').innerHTML = "";
            document.getElementById('equal').innerHTML = "";
            
            // Reset calculator state for new calculation
            $('#gridContainer').data('firstdist', 0);
            $('#gridContainer').data('seconddist', 0);
            $('#gridContainer').data('operator', 'add');
            $('#gridContainer').data('previouskeytype', 'graph');
            $('#gridContainer').data('lastposition', 'none');
        } else {
            // Normal operator behavior
            document.getElementById('operator').style.fontSize = "2em";
            document.getElementById('operator').innerHTML = "-"
            $('#gridContainer').data('previouskeytype', "operator");
            $('#gridContainer').data('operator', "-");
            $('#gridContainer').data('lastposition', "operator");
        }
    }
    if (action === 'multiply'){
        // Check if we're chaining from a result
        if($('#gridContainer').data('lastposition') == "second") {
            // Start chained calculation mode
            $('#gridContainer').data('chained', true);
            $('#gridContainer').data('chainedOperator', 'x');
            $('#gridContainer').data('previousResult', resultDist);
            
            // Show chained operator on the left
            document.getElementById('chainedOperator').innerHTML = "x";
            document.getElementById('chainedOperator').style.fontSize = "1.7em";
            document.getElementById('chainedOperator').style.display = "flex";
            
            // Clear the display for new calculation
            document.getElementById("chartHolder1").style.display = "none";
            document.getElementById("chartHolder2").style.display = "none";
            document.getElementById("numHolder1").style.display = "none";
            document.getElementById("numHolder2").style.display = "none";
            document.getElementById("displayName1").innerHTML = "";
            document.getElementById("displayName2").innerHTML = "";
            document.getElementById('operator').innerHTML = "";
            document.getElementById('equal').innerHTML = "";
            
            // Reset calculator state for new calculation
            $('#gridContainer').data('firstdist', 0);
            $('#gridContainer').data('seconddist', 0);
            $('#gridContainer').data('operator', 'add');
            $('#gridContainer').data('previouskeytype', 'graph');
            $('#gridContainer').data('lastposition', 'none');
        } else {
            // Normal operator behavior
            document.getElementById('operator').style.fontSize = "1.7em";
            document.getElementById('operator').innerHTML = "x"
            $('#gridContainer').data('previouskeytype', "operator");
            $('#gridContainer').data('operator', "x");
            $('#gridContainer').data('lastposition', "operator");
        }
    }
    if (action === 'divide'){
        // Check if we're chaining from a result
        if($('#gridContainer').data('lastposition') == "second") {
            // Start chained calculation mode
            $('#gridContainer').data('chained', true);
            $('#gridContainer').data('chainedOperator', '÷');
            $('#gridContainer').data('previousResult', resultDist);
            
            // Show chained operator on the left
            document.getElementById('chainedOperator').innerHTML = "÷";
            document.getElementById('chainedOperator').style.fontSize = "2em";
            document.getElementById('chainedOperator').style.display = "flex";
            
            // Clear the display for new calculation
            document.getElementById("chartHolder1").style.display = "none";
            document.getElementById("chartHolder2").style.display = "none";
            document.getElementById("numHolder1").style.display = "none";
            document.getElementById("numHolder2").style.display = "none";
            document.getElementById("displayName1").innerHTML = "";
            document.getElementById("displayName2").innerHTML = "";
            document.getElementById('operator').innerHTML = "";
            document.getElementById('equal').innerHTML = "";
            
            // Reset calculator state for new calculation
            $('#gridContainer').data('firstdist', 0);
            $('#gridContainer').data('seconddist', 0);
            $('#gridContainer').data('operator', 'add');
            $('#gridContainer').data('previouskeytype', 'graph');
            $('#gridContainer').data('lastposition', 'none');
        } else {
            // Normal operator behavior
            document.getElementById('operator').style.fontSize = "2em";
            document.getElementById('operator').innerHTML = "÷"
            $('#gridContainer').data('previouskeytype', "operator");
            $('#gridContainer').data('operator', "÷");
            $('#gridContainer').data('lastposition', "operator");
        }
    }
    if (action === 'scatter') {
        // Check if we're chaining from a result
        if($('#gridContainer').data('lastposition') == "second") {
            // Start chained calculation mode
            $('#gridContainer').data('chained', true);
            $('#gridContainer').data('chainedOperator', 'by');
            $('#gridContainer').data('previousResult', resultDist);
            
            // Show chained operator on the left
            document.getElementById('chainedOperator').innerHTML = "by";
            document.getElementById('chainedOperator').style.fontSize = "2em";
            document.getElementById('chainedOperator').style.display = "flex";
            
            // Clear the display for new calculation
            document.getElementById("chartHolder1").style.display = "none";
            document.getElementById("chartHolder2").style.display = "none";
            document.getElementById("numHolder1").style.display = "none";
            document.getElementById("numHolder2").style.display = "none";
            document.getElementById("displayName1").innerHTML = "";
            document.getElementById("displayName2").innerHTML = "";
            document.getElementById('operator').innerHTML = "";
            document.getElementById('equal').innerHTML = "";
            
            // Reset calculator state for new calculation
            $('#gridContainer').data('firstdist', 0);
            $('#gridContainer').data('seconddist', 0);
            $('#gridContainer').data('operator', 'add');
            $('#gridContainer').data('previouskeytype', 'graph');
            $('#gridContainer').data('lastposition', 'none');
        } else {
            // Normal operator behavior
            document.getElementById('operator').style.fontSize = "2em";
            document.getElementById('operator').innerHTML = "by"
            $('#gridContainer').data('previouskeytype', "operator");
            $('#gridContainer').data('operator', "by");
            $('#gridContainer').data('lastposition', "operator");
        }
    }
    if(action === "clear"){
        for(let i = 1; i<3; i++){
            $("#chart" + i).remove();
            $('#chartHolder' + i).append('<canvas id="chart' + i + '"></canvas>');
        }
        // Clear chart3 result canvas and result name
        $("#chart3").remove();
        $("#answer").append('<canvas class="charts redBorder" id="chart3"></canvas>');
        document.getElementById("nameAns").innerHTML = "";
        document.getElementById("numHolder1").innerHTML = ""
        document.getElementById("numHolder2").innerHTML = ""
        document.getElementById("displayName1").innerHTML = ""
        document.getElementById("displayName2").innerHTML = ""
        document.getElementById('equal').innerHTML = ""
        document.getElementById('operator').innerHTML = ""
        document.getElementById('chainedOperator').innerHTML = ""
        document.getElementById('chainedOperator').style.display = "none"
        document.getElementById("display").style.padding = "0vw 1vw 0vw 1vw";
        // Clear the result of the calculation as well
        resultDist = [];
        // Reset calculator state after clear
        $('#gridContainer').data('previouskeytype', 'graph');
        $('#gridContainer').data('firstdist', 0);
        $('#gridContainer').data('seconddist', 0);
        $('#gridContainer').data('operator', 'add');
        $('#gridContainer').data('lastposition', 'none');
        $('#gridContainer').data('chained', false);
        $('#gridContainer').data('chainedOperator', '');
        $('#gridContainer').data('previousResult', null);
        // Show chanceInput again
        document.getElementById("chanceInput").style.display = "";
        // Clear the text below the input
        document.getElementById("chanceOut").innerHTML = "";
    }
});

function calculate(first, operator, second){
    // Clear copula cache for fresh random numbers, except for multiplication by 1
    if(!(operator == "x" && second == 8 && parseFloat(document.getElementById("numberStore").value) === 1)){
        copulaCache = {};
    }
    
    var result = []
    var parsed1Hist = []
    var parsed2Hist = []
    numberStore = document.getElementById("numberStore").value
    parsed1 = distStorage[first.toString()]
    parsed2 = distStorage[second.toString()]
    if(first == 7){
        parsed1Hist = resultDist;
        for(let i = 0; i < 40; i++){
            parsed1Hist.push(0)
        }
    } else if(first == 8){
        for (let i = 1; i <= 10000; i++) {
            parsed1Hist.push(parseFloat(numberStore))
        }
    } else{
        if(parsed1["sips"][0]["function"] == "Metalog_1_0"){
            var aCoeff1 = parsed1["sips"][0]["arguments"]["aCoefficients"];
            if(aCoeff1.length < 16){
                for(i = aCoeff1.length; i < 16; i++){
                    aCoeff1.push(0)
                }
            }
            let lb = parsed1["sips"][0]["arguments"]["lowerBound"]
            let ub = parsed1["sips"][0]["arguments"]["upperBound"]
            let data1 = 0;
            for (let i = 1; i <= 10000; i++) {
                // Use copula-aware random number generation
                let r1 = getCopulaValue(i, parsed1["sips"][0], parsed1);
                umq1 = uMQ(aCoeff1, r1)
                if(lb != undefined){
                    if(ub == undefined){
                        data1 = lb + exp(umq1)
                    } else{
                        data1 = lb + ub * exp(umq1)/(1+exp(umq1))
                    }
                } else if(ub != undefined){
                    data1 = ub - exp(0 - umq1)
                } else {
                    // No bounds specified - use the Metalog value directly
                    data1 = umq1
                }
                parsed1Hist.push(data1)
            }
        } else if(parsed1["sips"][0]["function"] == "SIP_Array"){
            parsed1Hist = parsed1["sips"][0]["arguments"]["value"]
        }
    }
    
    if(second == 7){
        parsed2Hist = resultDist;
        for(let i = 0; i < 40; i++){
            parsed2Hist.push(0)
        }
    } else if(second == 8){
        for (let i = 1; i <= 10000; i++) {
            parsed2Hist.push(parseFloat(numberStore))
        }
    } else{
        if(parsed2["sips"][0]["function"] == "Metalog_1_0"){
            var aCoeff2 = parsed2["sips"][0]["arguments"]["aCoefficients"];
            if(aCoeff2.length < 16){
                for(i = aCoeff2.length; i < 16; i++){
                    aCoeff2.push(0)
                }
            }
            let lb2 = parsed2["sips"][0]["arguments"]["lowerBound"]
            let ub2 = parsed2["sips"][0]["arguments"]["upperBound"]
            let data2 = 0;
            for (let i = 1; i <= 10000; i++) {
                // Use copula-aware random number generation
                let r2 = getCopulaValue(i, parsed2["sips"][0], parsed2);
                umq2 = uMQ(aCoeff2, r2)
                if(lb2 != undefined){
                    if(ub2 == undefined){
                        data2 = lb2 + exp(umq2)
                    } else{
                        data2 = lb2 + ub2 * exp(umq2)/(1+exp(umq2))
                    }
                } else if(ub2 != undefined){
                    data2 = ub2 - exp(0 - umq2)
                } else {
                    // No bounds specified - use the Metalog value directly
                    data2 = umq2
                }
                parsed2Hist.push(data2)
            }
        } else if(parsed2["sips"][0]["function"] == "SIP_Array"){
            parsed2Hist = parsed2["sips"][0]["arguments"]["value"]
        }
    }
    
    if(operator == "+"){
        for(let i = 0; i<10000; i++){
            result.push(parsed1Hist[i] + parsed2Hist[i])
        }
    } else if(operator == "-"){
        for(let i = 0; i<10000; i++){
            result.push(parsed1Hist[i] - parsed2Hist[i])
        }
    } else if(operator == "x"){
        // Special case: multiplication by 1 should return the original distribution
        if(second == 8 && parseFloat(numberStore) === 1){
            result = [...parsed1Hist]; // Copy the array directly
        } else {
            for(let i = 0; i<10000; i++){
                result.push(parsed1Hist[i] * parsed2Hist[i])
            }
        }
    } else if(operator == "÷"){
        for(let i = 0; i<10000; i++){
            result.push(parsed1Hist[i] / parsed2Hist[i])
        }
    }
    resultDist = result
    
    return result;
}

function scatterplot(y_dist, x_dist) {
    // y_dist and x_dist are the keys (numbers) for the distributions in distStorage
    // Generate 10,000 paired samples
    const N = 10000;
    let ySamples = [];
    let xSamples = [];

    // Helper to get N samples from a SIP distribution (copula-aware, like in calculate)
    function getSamples(distKey) {
        let parsed = distStorage[distKey.toString()];
        let samples = [];
        if (!parsed || !parsed.sips || !parsed.sips[0]) return Array(N).fill(NaN);
        let sip = parsed.sips[0];
        if (sip.function === "Metalog_1_0") {
            let aCoeff = [...sip.arguments.aCoefficients];
            if (aCoeff.length < 16) for (let i = aCoeff.length; i < 16; i++) aCoeff.push(0);
            let lb = sip.arguments.lowerBound;
            let ub = sip.arguments.upperBound;
            for (let i = 1; i <= N; i++) {
                let r = getCopulaValue(i, sip, parsed);
                let val = uMQ(aCoeff, r);
                if (lb !== undefined) {
                    if (ub === undefined) {
                        val = lb + exp(val);
                    } else {
                        val = lb + ub * exp(val) / (1 + exp(val));
                    }
                } else if (ub !== undefined) {
                    val = ub - exp(0 - val);
                }
                samples.push(val);
            }
        } else if (sip.function === "SIP_Array") {
            let values = sip.arguments.value;
            // If values array is shorter than N, repeat as needed
            for (let i = 0; i < N; i++) {
                samples.push(values[i % values.length]);
            }
        } else {
            samples = Array(N).fill(NaN);
        }
        return samples;
    }

    ySamples = getSamples(y_dist);
    xSamples = getSamples(x_dist);

    // Build data array for Chart.js scatter plot
    let scatterData = [];
    for (let i = 0; i < N; i++) {
        scatterData.push({ x: xSamples[i], y: ySamples[i] });
    }

    // Prepare Chart.js config
    const scatterCfg = {
        type: 'scatter',
        data: {
            datasets: [{
                // No label at all, so legend/key never appears
                label: '',
                data: scatterData,
                backgroundColor: 'rgba(37, 93, 150, 0.7)',
                pointRadius: 2,
            }]
        },
        options: {
            legend: { display: false }, // Hide legend always
            responsive: true,
            maintainAspectRatio: true, // Prevent stretching, but let CSS control the size
            aspectRatio: 1,
            plugins: {
                legend: { display: false }, // Hide legend always
                title: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: chartTitles[x_dist.toString()] || 'X' },
                    grid: { display: false },
                },
                y: {
                    title: { display: true, text: chartTitles[y_dist.toString()] || 'Y' },
                    grid: { display: false },
                }
            },
            elements: {
                point: { radius: 2 }
            },
            hover: { mode: null }
        }
    };

    return scatterCfg;
}

function mod(x, y) {
    return x % y;
}

function LN(x) {
    return Math.log(x);
}

function exp(x) {
    return Math.exp(x);
}

function HDRprng(PM_Index, varID, entity, seed3, seed4) {
    var r = (mod((mod(mod(999999999999989, mod(PM_Index * 2499997 + varID * 1800451 + entity * 2000371 + seed3 * 1796777 +
        seed4 * 2299603, 7450589) * 4658 + 7450581) * 383, 99991) * 7440893 + mod(mod(999999999999989,
        mod(PM_Index * 2246527 + varID * 2399993 + entity * 2100869 + seed3 * 1918303 + seed4 * 1624729, 7450987) *
        7580 + 7560584) * 17669, 7440893)) * 1343, 4294967296) + 0.5) / 4294967296;
    return r;
}

function uMQ(a, r){
    let result = a[0]+a[1]*LN(r/(1-r))+a[2]*(r-0.5)*LN(r/(1-r))+a[3]*(r-0.5)+a[4]*(r-0.5)**2+a[5]*(r-0.5)**2*LN(r/(1-r))+a[6]*(r-0.5)**3+a[7]*(r-0.5)**3*LN(r/(1-r))+a[8]*(r-0.5)**4+a[9]*(r-0.5)**4*LN(r/(1-r))+a[10]*(r-0.5)**5+a[11]*(r-0.5)**5*LN(r/(1-r))+a[12]*(r-0.5)**6+a[13]*(r-0.5)**6*LN(r/(1-r))+a[14]*(r-0.5)**7+a[15]*(r-0.5)**7*LN(r/(1-r))
    return result
}

function isError(obj){
    return Object.prototype.toString.call(obj) === "[object Error]";
}

function inputCopula(){
    console.log("inputCopula")
    document.getElementById("copulaInput").click();
}

// Popup functionality
function showLibraryPopup() {
    document.getElementById("libraryPopup").style.display = "flex";
    // Reset form
    document.getElementById("selectedFileName").innerHTML = "";
    document.getElementById("urlInput").value = "";
    document.getElementById("fileOption").checked = true;
    document.getElementById("fileSection").style.display = "block";
    document.getElementById("urlSection").style.display = "none";
}

function hideLibraryPopup() {
    document.getElementById("libraryPopup").style.display = "none";
}

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById("libraryPopup");
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hideLibraryPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            hideLibraryPopup();
        }
    });
    
    const fileOption = document.getElementById("fileOption");
    const urlOption = document.getElementById("urlOption");
    const fileSection = document.getElementById("fileSection");
    const urlSection = document.getElementById("urlSection");
    
    fileOption.addEventListener('change', function() {
        if (this.checked) {
            fileSection.style.display = "block";
            urlSection.style.display = "none";
        }
    });
    
    urlOption.addEventListener('change', function() {
        if (this.checked) {
            fileSection.style.display = "none";
            urlSection.style.display = "block";
        }
    });
    
    // Handle file selection
    const popupFileInput = document.getElementById("popupFileInput");
    popupFileInput.addEventListener('change', function() {
        const fileName = this.files[0]?.name || "";
        document.getElementById("selectedFileName").innerHTML = fileName ? `Selected: ${fileName}` : "";
    });
});



function loadLibraryFromPopup() {
    const fileOption = document.getElementById("fileOption");
    const urlInput = document.getElementById("urlInput");
    const popupFileInput = document.getElementById("popupFileInput");
    
    if (fileOption.checked) {
        // Load from file
        if (popupFileInput.files.length > 0) {
            const file = popupFileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const libraryJson = JSON.parse(e.target.result);
                    processLibraryJson(libraryJson);
                    hideLibraryPopup();
                } catch (error) {
                    alert("Error parsing file: " + error.message);
                }
            };
            reader.readAsText(file);
        } else {
            alert("Please select a file first.");
        }
    } else {
        // URL input path
        const rawUrl = (urlInput.value || '').trim();
        if (!rawUrl) {
            alert('Please enter a URL.');
            return;
        }
        loadLibraryFromUrlWithRetry(rawUrl)
            .then((libraryJson) => {
                processLibraryJson(libraryJson);
                hideLibraryPopup();
            })
            .catch((error) => {
                alert(error.message || 'Failed to load library from URL.');
            });
    }
}

// Intercept same-origin links to SIP files and load inline instead of navigating
function setupSipLinkInterceptor() {
    function handleClick(e) {
        try {
            // Basic validation
            if (!e || !e.target) return;
            
            // Find the closest anchor tag
            let anchor = e.target;
            while (anchor && anchor.tagName !== 'A') {
                anchor = anchor.parentElement;
            }
            if (!anchor || !anchor.href) return;
            
            const href = anchor.href;
            if (!href) return;
            
            // Skip if it's a target="_blank" link
            if (anchor.getAttribute('target') === '_blank') return;
            
            let resolved;
            try {
                resolved = new URL(href);
            } catch (err) {
                return; // Invalid URL, ignore
            }
            
            const pathLower = (resolved.pathname || '').toLowerCase();
            const looksLikeSip = pathLower.endsWith('.sipmath') || pathLower.endsWith('.json');
            const sameOrigin = resolved.origin === window.location.origin;
            
            if (sameOrigin && looksLikeSip) {
                console.log('Intercepting SIP link:', resolved.href);
                e.preventDefault();
                e.stopPropagation();
                
                loadLibraryFromUrlWithRetry(resolved.href)
                    .then((libraryJson) => {
                        console.log('Successfully loaded SIP from link:', resolved.href);
                        processLibraryJson(libraryJson);
                    })
                    .catch((error) => {
                        console.error('Failed to load SIP from link:', resolved.href, error);
                        alert(error.message || 'Failed to load SIP from link.');
                    });
            }
        } catch (error) {
            console.error('Error in SIP link interceptor:', error);
        }
    }
    
    // Add the click listener
    document.addEventListener('click', handleClick, true);
    console.log('SIP link interceptor initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSipLinkInterceptor);
} else {
    setupSipLinkInterceptor();
}

// Auto-load from URL parameter (?sip=...)
function setupSipUrlParamLoader() {
    const params = new URLSearchParams(window.location.search);
    const sipParam = params.get('sip');
    if (!sipParam) return;
    
    console.log('Auto-loading SIP from URL parameter:', sipParam);
    loadLibraryFromUrlWithRetry(sipParam)
        .then((libraryJson) => {
            console.log('Successfully auto-loaded SIP from URL parameter');
            processLibraryJson(libraryJson);
        })
        .catch((error) => {
            console.warn('Failed to auto-load SIP from URL parameter:', error);
            // Don't show alert for auto-load failures, just log them
        });
}

// Initialize URL parameter loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSipUrlParamLoader);
} else {
    setupSipUrlParamLoader();
}

// Test fetch functionality
function testFetch() {
    console.log('Testing fetch functionality...');
    console.log('fetch available:', typeof fetch !== 'undefined');
    console.log('AbortSignal.timeout available:', typeof AbortSignal !== 'undefined' && AbortSignal.timeout);
    
    // Try a simple fetch to see if it works
    fetch('./uniform.sipmath')
        .then(response => {
            console.log('Test fetch successful:', response.status, response.statusText);
            return response.text();
        })
        .then(text => {
            console.log('Test fetch content length:', text.length);
        })
        .catch(error => {
            console.error('Test fetch failed:', error);
        });
}

// Run fetch test when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testFetch);
} else {
    testFetch();
}

// New function to load SIP library from URL
async function loadLibraryFromUrl(url) {
    try {
        console.log('Loading library from URL:', url);
        console.log('Current page URL:', window.location.href);
        
        // Validate URL format (supports relative and absolute)
        const urlObj = new URL(url, window.location.href);
        console.log('Resolved URL:', urlObj.href);
        console.log('URL origin:', urlObj.origin);
        console.log('Current origin:', window.location.origin);
        
        // Check for common hosting platforms and adjust URL if needed
        const adjustedUrl = adjustUrlForHostingPlatform(urlObj.href);
        console.log('Adjusted URL:', adjustedUrl);
        
        // Fetch the SIP file
        console.log('Fetching from:', adjustedUrl);
        
        let response;
        
        // Try to use AbortSignal.timeout if available, otherwise use AbortController
        if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
            // Modern browsers support AbortSignal.timeout
            response = await fetch(adjustedUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                },
                signal: AbortSignal.timeout(30000)
            });
        } else {
            // Fallback for older browsers
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);
            
            try {
                response = await fetch(adjustedUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                    },
                    signal: controller.signal
                });
            } finally {
                clearTimeout(timeoutId);
            }
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        if (!contentType || (!contentType.includes('application/json') && !contentType.includes('text/plain'))) {
            console.warn('Warning: Unexpected content type:', contentType);
        }
        
        const text = await response.text();
        console.log('Response length:', text.length, 'characters');
        
        try {
            const libraryJson = JSON.parse(text);
            console.log('Successfully parsed as JSON');
            return libraryJson;
        } catch (parseError) {
            console.log('JSON parsing failed, trying SIPmath format');
            return parseSIPmathFormat(text);
        }
        
    } catch (error) {
        console.error('Error in loadLibraryFromUrl:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please check the URL and try again.');
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error(`Network error: ${error.message}. Please check your internet connection and the URL.`);
        } else if (error.name === 'TypeError' && error.message.includes('URL')) {
            throw new Error('Invalid URL format. Please enter a valid URL.');
        } else if (error.message.includes('HTTP error')) {
            throw new Error(`HTTP Error: ${error.message}`);
        } else {
            throw new Error(`Failed to load library: ${error.message}`);
        }
    }
}

// Function to adjust URLs for common hosting platforms
function adjustUrlForHostingPlatform(url) {
    const urlObj = new URL(url, window.location.href);
    
    // For same-origin relative URLs, return as-is
    if (urlObj.origin === window.location.origin) {
        return urlObj.href;
    }
    
    // GitHub raw content
    if (urlObj.hostname === 'github.com') {
        return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    
    // GitLab raw content
    if (urlObj.hostname === 'gitlab.com') {
        return url.replace('/blob/', '/raw/');
    }
    
    // Dropbox direct link
    if (urlObj.hostname === 'www.dropbox.com') {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    }
    
    // Google Drive direct link (basic support)
    if (urlObj.hostname === 'drive.google.com' && urlObj.pathname.includes('/file/d/')) {
        const fileId = urlObj.pathname.match(/\/file\/d\/([^\/]+)/)?.[1];
        if (fileId) {
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
    }
    
    // Return original URL if no adjustments needed
    return urlObj.href;
}

// Enhanced error handling with retry logic
async function loadLibraryFromUrlWithRetry(url, maxRetries = 2) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await loadLibraryFromUrl(url);
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt < maxRetries) {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    
    throw lastError;
}

// Function to parse SIPmath format (if needed)
function parseSIPmathFormat(text) {
    // This is a basic implementation - you may need to enhance it based on your SIPmath format
    try {
        // Try to extract JSON from SIPmath format
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // If no JSON found, try to parse as plain SIPmath
        // This would need to be customized based on your specific SIPmath format
        throw new Error('SIPmath format parsing not yet implemented for this format');
        
    } catch (error) {
        throw new Error('Unable to parse the file format. Please ensure it\'s a valid SIP library file.');
    }
}

function processLibraryJson(libraryJson) {
    console.log(libraryJson);

    const rng = libraryJson.U01.rng;
    const copula = libraryJson.U01.copula;
    const dateCreated = libraryJson.dateCreated || new Date().toISOString();
    const provenance = libraryJson.provenance || "unknown";
    const globalVariables = libraryJson.globalVariables || [];
  
    libraryJson.sips.forEach((sip, i) => {
        const singleSIP = {
            name: "Single Variable Library",
            dateCreated: dateCreated,
            provenance: provenance,
            U01: { 
                rng: rng,
                copula: copula
            },
            globalVariables: globalVariables,
            sips: [sip]
        };
        console.log(singleSIP)
    
        // Convert to blob or file, depending on how your calculator handles upload
        const blob = new Blob([JSON.stringify(singleSIP, null, 2)], { type: 'application/json' });
        const file = new File([blob], `sip_${i + 1}.json`, { type: 'application/json' });
    
        // transferring the files, as if the user uploaded each SIP in the library to a key 1 - n
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const input = document.getElementById('fileInput' + (i+1));
        input.files = dataTransfer.files;
    
        // Run the upload handler
        handleFileUpload(i+1);
    });
}

// Keep the old event listener for backward compatibility, but it's no longer used
document.getElementById("copulaInput").addEventListener("change", () => {
    // This is now handled by the popup, but keeping for compatibility
    console.log("Legacy copulaInput handler - use popup instead");
});



// Global cache for copula results to ensure consistency
let copulaCache = {};

// Function to get copula value for a specific SIP
function getCopulaValue(PM_Index, sip, parsed) {
    if (sip.ref && sip.ref.source === "copula") {
        const copulaName = sip.ref.name;
        const copulaLayer = sip.ref.copulaLayer;
        
        // Create a cache key for this PM_Index and copula
        const cacheKey = `${PM_Index}_${copulaName}`;
        
        // Check if we already generated correlated uniforms for this PM_Index and copula
        if (!copulaCache[cacheKey]) {
            // Find the copula configuration
            const copulaConfig = parsed.U01.copula.find(c => c.name === copulaName);
            if (copulaConfig) {
                copulaCache[cacheKey] = generateGaussianCopula(PM_Index, copulaConfig, parsed.U01.rng, parsed.globalVariables);
            }
        }
        
        // Get the cached correlated uniforms
        const correlatedUniforms = copulaCache[cacheKey];
        if (correlatedUniforms) {
            // Map copula layer to index: c1->0, c2->1, c3->2
            const layerIndex = parseInt(copulaLayer.substring(1)) - 1;
            if (layerIndex >= 0 && layerIndex < correlatedUniforms.length) {
                return correlatedUniforms[layerIndex];
            }
        }
    }
    
    // Fallback to direct RNG if no copula reference
    const rngConfig = parsed.U01.rng[0];
    return HDRprng(PM_Index, rngConfig.arguments.varId, rngConfig.arguments.entity, 
                   rngConfig.arguments.seed3, rngConfig.arguments.seed4);
}

// Function to generate correlated random numbers using Gaussian copula
function generateGaussianCopula(PM_Index, copulaConfig, rngConfigs, globalVariables) {
    let correlationMatrix = copulaConfig.arguments.correlationMatrix;
    const rngNames = copulaConfig.arguments.rng;
    
    // Resolve correlation matrix if it's a global variable reference
    if (correlationMatrix && correlationMatrix.type === "globalVariables") {
        const globalVar = globalVariables.find(gv => gv.name === correlationMatrix.value);
        if (globalVar) {
            correlationMatrix = globalVar.value;
        }
    }
    
    // Generate independent uniform random numbers
    const uniformRands = [];
    for (let i = 0; i < rngNames.length; i++) {
        const rngName = rngNames[i];
        const rngConfig = rngConfigs.find(r => r.name === rngName);
        if (rngConfig) {
            const varID = rngConfig.arguments.varId;
            const entity = rngConfig.arguments.entity;
            const seed3 = rngConfig.arguments.seed3;
            const seed4 = rngConfig.arguments.seed4;
            const uniformRand = HDRprng(PM_Index, varID, entity, seed3, seed4);
            uniformRands.push(uniformRand);
        }
    }
    
    // Convert uniform to standard normal using inverse CDF
    const normalRands = uniformRands.map(u => {
        return inverseNormalCDF(u);
    });
    
    // Apply correlation matrix transformation
    // The correlation matrix is stored as a list of {row, col, value} objects
    const correlatedNormals = [];
    
    if (correlationMatrix && correlationMatrix.matrix) {
        // Build correlation matrix from the list format
        const n = rngNames.length;
        const corrMatrix = Array(n).fill().map(() => Array(n).fill(0));
        
        correlationMatrix.matrix.forEach(item => {
            const rowIndex = correlationMatrix.rows.indexOf(item.row);
            const colIndex = correlationMatrix.columns.indexOf(item.col);
            if (rowIndex >= 0 && colIndex >= 0) {
                corrMatrix[rowIndex][colIndex] = item.value;
            }
        });
        
        // Apply Cholesky decomposition for correlation
        if (n === 2) {
            const rho = corrMatrix[0][1];
            correlatedNormals[0] = normalRands[0];
            correlatedNormals[1] = rho * normalRands[0] + Math.sqrt(1 - rho * rho) * normalRands[1];
        } else if (n === 3) {
            const rho12 = corrMatrix[0][1];
            const rho13 = corrMatrix[0][2];
            const rho23 = corrMatrix[1][2];
            
            correlatedNormals[0] = normalRands[0];
            correlatedNormals[1] = rho12 * normalRands[0] + Math.sqrt(1 - rho12 * rho12) * normalRands[1];
            correlatedNormals[2] = rho13 * normalRands[0] + 
                                 (rho23 - rho12 * rho13) / Math.sqrt(1 - rho12 * rho12) * normalRands[1] +
                                 Math.sqrt(1 - rho13 * rho13 - Math.pow((rho23 - rho12 * rho13) / Math.sqrt(1 - rho12 * rho12), 2)) * normalRands[2];
        }
    } else {
        correlatedNormals.push(...normalRands);
    }
    
    // Convert back to uniform using normal CDF
    const correlatedUniforms = correlatedNormals.map(n => {
        return 0.5 * (1 + erf(n / Math.sqrt(2)));
    });
    
    return correlatedUniforms;
}

// Inverse normal CDF approximation
function inverseNormalCDF(p) {
    // Beasley-Springer-Moro algorithm
    const a0 = 2.50662823884;
    const a1 = -18.61500062529;
    const a2 = 41.39119773534;
    const a3 = -25.44106049637;
    const b1 = -8.47351093090;
    const b2 = 23.08336743743;
    const b3 = -21.06224101826;
    const b4 = 3.13082909833;
    const c0 = -2.78718931138;
    const c1 = -2.29796479134;
    const c2 = 4.85014127135;
    const c3 = 2.32121276858;
    const d1 = 3.54388924762;
    const d2 = 1.63706781897;
    
    let q = p - 0.5;
    let r, x;
    
    if (Math.abs(q) <= 0.42) {
        r = q * q;
        x = q * (((a3 * r + a2) * r + a1) * r + a0) / ((((b4 * r + b3) * r + b2) * r + b1) * r + 1);
    } else {
        r = p;
        if (q > 0) r = 1 - p;
        r = Math.sqrt(-Math.log(r));
        x = (((c3 * r + c2) * r + c1) * r + c0) / ((d2 * r + d1) * r + 1);
        if (q < 0) x = -x;
    }
    
    return x;
}

// Error function approximation
function erf(x) {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
}