// Stock data is defined within this file
// Preloaded stock data (no external .SIPmath files needed)
const stockReturnsData = [{
    "name": "Stock_Returns",
    "objectType": "sipModel",
    "libraryType": "SIPmath_3_0",
    "dateCreated": "03-26-2025",
    "globalVariables": [
        {
            "name": "correlationMatrix",
            "value": {
                "columns": [
                    "Stock_A",
                    "Stock_B",
                    "Stock_C"
                ],
                "rows": [
                    "Stock_A",
                    "Stock_B",
                    "Stock_C"
                ],
                "matrix": [
                    {
                        "row": "Stock_A",
                        "col": "Stock_A",
                        "value": 1.0
                    },
                    {
                        "row": "Stock_A",
                        "col": "Stock_B",
                        "value": 0.6
                    },
                    {
                        "row": "Stock_A",
                        "col": "Stock_C",
                        "value": 0.5
                    },
                    {
                        "row": "Stock_B",
                        "col": "Stock_A",
                        "value": 0.6
                    },
                    {
                        "row": "Stock_B",
                        "col": "Stock_B",
                        "value": 1.0
                    },
                    {
                        "row": "Stock_B",
                        "col": "Stock_C",
                        "value": 0.4
                    },
                    {
                        "row": "Stock_C",
                        "col": "Stock_A",
                        "value": 0.5
                    },
                    {
                        "row": "Stock_C",
                        "col": "Stock_B",
                        "value": 0.4
                    },
                    {
                        "row": "Stock_C",
                        "col": "Stock_C",
                        "value": 1.0
                    }
                ]
            }
        }
    ],
    "provenance": "Sam",
    "U01": {
        "rng": [
            {
                "name": "hdr1",
                "function": "HDR_2_0",
                "arguments": {
                    "counter": "PM_Index",
                    "entity": 1,
                    "varId": 1,
                    "seed3": 0,
                    "seed4": 0
                }
            },
            {
                "name": "hdr2",
                "function": "HDR_2_0",
                "arguments": {
                    "counter": "PM_Index",
                    "entity": 1,
                    "varId": 2,
                    "seed3": 0,
                    "seed4": 0
                }
            },
            {
                "name": "hdr3",
                "function": "HDR_2_0",
                "arguments": {
                    "counter": "PM_Index",
                    "entity": 1,
                    "varId": 3,
                    "seed3": 0,
                    "seed4": 0
                }
            }
        ],
        "copula": [
            {
                "arguments": {
                    "correlationMatrix": {
                        "type": "globalVariables",
                        "value": "correlationMatrix"
                    },
                    "rng": [
                        "hdr1",
                        "hdr2",
                        "hdr3"
                    ]
                },
                "function": "GaussianCopula",
                "name": "Gaussian",
                "copulaLayer": [
                    "c1",
                    "c2",
                    "c3"
                ]
            }
        ]
    },
    "sips": [
        {
            "name": "Stock_A",
            "ref": {
                "source": "copula",
                "name": "Gaussian",
                "copulaLayer": "c1"
            },
            "function": "Metalog_1_0",
            "arguments": {
                "aCoefficients": [
                    0.2,
                    0.0682679419970128,
                    -4.593879758023108e-17
                ]
            },
            "metadata": {
                "density": [
                    0.014633515685059217,
                    0.02674280441048462,
                    0.046357614790488076,
                    0.08182306633826529,
                    0.14374919985920523,
                    0.25940174169560815,
                    0.4366468355091175,
                    0.7408141179374551,
                    1.2112869748410404,
                    1.8781121431540064,
                    2.6739718794518823,
                    3.3747436373580006,
                    3.6620409622270325,
                    3.374743637358007,
                    2.673971879451889,
                    1.878112143154012,
                    1.2112869748410444,
                    0.7408141179374572,
                    0.4366468355091192,
                    0.25940174169560853,
                    0.14374919985920553,
                    0.08182306633826539,
                    0.04635761479048812,
                    0.026742804410484666,
                    0.014633515685059242
                ]
            }
        },
        {
            "name": "Stock_B",
            "ref": {
                "source": "copula",
                "name": "Gaussian",
                "copulaLayer": "c2"
            },
            "function": "Metalog_1_0",
            "arguments": {
                "aCoefficients": [
                    0.3,
                    0.20480382599103844,
                    0.05688995166417741
                ]
            },
            "metadata": {
                "density": [
                    0.00567538798343543,
                    0.011159245605017524,
                    0.02177971521242274,
                    0.04241558992482058,
                    0.087270734310875,
                    0.16104886897880757,
                    0.3035856050993325,
                    0.5437099573340927,
                    0.8704778860492602,
                    1.1567537256892562,
                    1.2426203521130494,
                    1.122569774382575,
                    0.9020841313836659,
                    0.6704929341408827,
                    0.4713813608416496,
                    0.31805927343307594,
                    0.20799703841709596,
                    0.13325548007964982,
                    0.08289256249248901,
                    0.05388623614554702,
                    0.031535798071203686,
                    0.019308846377795688,
                    0.011816482473748764,
                    0.007371506696439387,
                    0.004276825902249574
                ]
            }
        },
        {
            "name": "Stock_C",
            "ref": {
                "source": "copula",
                "name": "Gaussian",
                "copulaLayer": "c3"
            },
            "function": "Metalog_1_0",
            "arguments": {
                "aCoefficients": [
                    0.07,
                    0.022755980665670934,
                    -1.1963317077609108e-17
                ]
            },
            "metadata": {
                "density": [
                    0.04390054705517766,
                    0.08022841323145385,
                    0.13907284437146408,
                    0.24546919901479586,
                    0.4312475995776158,
                    0.7782052250868243,
                    1.3099405065273526,
                    2.2224423538123643,
                    3.633860924523121,
                    5.634336429462021,
                    8.021915638355647,
                    10.124230912074003,
                    10.986122886681098,
                    10.124230912074022,
                    8.021915638355667,
                    5.63433642946204,
                    3.633860924523135,
                    2.222442353812372,
                    1.3099405065273562,
                    0.7782052250868257,
                    0.43124759957761577,
                    0.2454691990147964,
                    0.1390728443714643,
                    0.08022841323145394,
                    0.04390054705517772
                ]
            }
        }
    ],
    "version": "1"
}, {
    "name": "Stock_Returns",
    "objectType": "sipModel",
    "libraryType": "SIPmath_3_0",
    "dateCreated": "03-26-2025",
    "globalVariables": [
        {
            "name": "correlationMatrix",
            "value": {
                "columns": [
                    "Stock_A",
                    "Stock_B",
                    "Stock_C"
                ],
                "rows": [
                    "Stock_A",
                    "Stock_B",
                    "Stock_C"
                ],
                "matrix": [
                    {
                        "row": "Stock_A",
                        "col": "Stock_A",
                        "value": 1.0
                    },
                    {
                        "row": "Stock_A",
                        "col": "Stock_B",
                        "value": 0.6
                    },
                    {
                        "row": "Stock_A",
                        "col": "Stock_C",
                        "value": 0.5
                    },
                    {
                        "row": "Stock_B",
                        "col": "Stock_A",
                        "value": 0.6
                    },
                    {
                        "row": "Stock_B",
                        "col": "Stock_B",
                        "value": 1.0
                    },
                    {
                        "row": "Stock_B",
                        "col": "Stock_C",
                        "value": 0.4
                    },
                    {
                        "row": "Stock_C",
                        "col": "Stock_A",
                        "value": 0.5
                    },
                    {
                        "row": "Stock_C",
                        "col": "Stock_B",
                        "value": 0.4
                    },
                    {
                        "row": "Stock_C",
                        "col": "Stock_C",
                        "value": 1.0
                    }
                ]
            }
        }
    ],
    "provenance": "Sam",
    "U01": {
        "rng": [
            {
                "name": "hdr1",
                "function": "HDR_2_0",
                "arguments": {
                    "counter": "PM_Index",
                    "entity": 1,
                    "varId": 1,
                    "seed3": 0,
                    "seed4": 0
                }
            },
            {
                "name": "hdr2",
                "function": "HDR_2_0",
                "arguments": {
                    "counter": "PM_Index",
                    "entity": 1,
                    "varId": 2,
                    "seed3": 0,
                    "seed4": 0
                }
            },
            {
                "name": "hdr3",
                "function": "HDR_2_0",
                "arguments": {
                    "counter": "PM_Index",
                    "entity": 1,
                    "varId": 3,
                    "seed3": 0,
                    "seed4": 0
                }
            }
        ],
        "copula": [
            {
                "arguments": {
                    "correlationMatrix": {
                        "type": "globalVariables",
                        "value": "correlationMatrix"
                    },
                    "rng": [
                        "hdr1",
                        "hdr2",
                        "hdr3"
                    ]
                },
                "function": "GaussianCopula",
                "name": "Gaussian",
                "copulaLayer": [
                    "c1",
                    "c2",
                    "c3"
                ]
            }
        ]
    },
    "sips": [
        {
            "name": "Stock_A",
            "ref": {
                "source": "copula",
                "name": "Gaussian",
                "copulaLayer": "c1"
            },
            "function": "Metalog_1_0",
            "arguments": {
                "aCoefficients": [
                    0.15	,
                    0.0682679419970128,
                    -4.593879758023108e-17
                ]
            },
            "metadata": {
                "density": [
                    0.014633515685059217,
                    0.02674280441048462,
                    0.046357614790488076,
                    0.08182306633826529,
                    0.14374919985920523,
                    0.25940174169560815,
                    0.4366468355091175,
                    0.7408141179374551,
                    1.2112869748410404,
                    1.8781121431540064,
                    2.6739718794518823,
                    3.3747436373580006,
                    3.6620409622270325,
                    3.374743637358007,
                    2.673971879451889,
                    1.878112143154012,
                    1.2112869748410444,
                    0.7408141179374572,
                    0.4366468355091192,
                    0.25940174169560853,
                    0.14374919985920553,
                    0.08182306633826539,
                    0.04635761479048812,
                    0.026742804410484666,
                    0.014633515685059242
                ]
            }
        },
        {
            "name": "Stock_B",
            "ref": {
                "source": "copula",
                "name": "Gaussian",
                "copulaLayer": "c2"
            },
            "function": "Metalog_1_0",
            "arguments": {
                "aCoefficients": [
                    0.28,
                    0.20480382599103844,
                    0.05688995166417741
                ]
            },
            "metadata": {
                "density": [
                    0.00567538798343543,
                    0.011159245605017524,
                    0.02177971521242274,
                    0.04241558992482058,
                    0.087270734310875,
                    0.16104886897880757,
                    0.3035856050993325,
                    0.5437099573340927,
                    0.8704778860492602,
                    1.1567537256892562,
                    1.2426203521130494,
                    1.122569774382575,
                    0.9020841313836659,
                    0.6704929341408827,
                    0.4713813608416496,
                    0.31805927343307594,
                    0.20799703841709596,
                    0.13325548007964982,
                    0.08289256249248901,
                    0.05388623614554702,
                    0.031535798071203686,
                    0.019308846377795688,
                    0.011816482473748764,
                    0.007371506696439387,
                    0.004276825902249574
                ]
            }
        },
        {
            "name": "Stock_C",
            "ref": {
                "source": "copula",
                "name": "Gaussian",
                "copulaLayer": "c3"
            },
            "function": "Metalog_1_0",
            "arguments": {
                "aCoefficients": [
                    0.08,
                    0.022755980665670934,
                    -1.1963317077609108e-17
                ]
            },
            "metadata": {
                "density": [
                    0.04390054705517766,
                    0.08022841323145385,
                    0.13907284437146408,
                    0.24546919901479586,
                    0.4312475995776158,
                    0.7782052250868243,
                    1.3099405065273526,
                    2.2224423538123643,
                    3.633860924523121,
                    5.634336429462021,
                    8.021915638355647,
                    10.124230912074003,
                    10.986122886681098,
                    10.124230912074022,
                    8.021915638355667,
                    5.63433642946204,
                    3.633860924523135,
                    2.222442353812372,
                    1.3099405065273562,
                    0.7782052250868257,
                    0.43124759957761577,
                    0.2454691990147964,
                    0.1390728443714643,
                    0.08022841323145394,
                    0.04390054705517772
                ]
            }
        }
    ],
    "version": "1"
}]; 

// Functions from newFuncs.js are now included directly below

// === Global Variables ===
let resultDist = [];
let correlationMatrixData = null;
let numSips = 0;
let rngParamsArray = []; // Stores RNG parameters for each SIP when correlation is active
let distStorage = {}; // Stores the parsed data for each file input
let chartList = {}; // Stores chart configurations
let chartTitles = {}; // Stores chart titles
let numberStore = 0; // Stores the user-entered constant number
let cowSign = "<"; // For the comparison operator
let leftCount = 0; // For cow dropdown positioning
const numBins = 20; // Number of bins for histograms
let globalFilteredSumForPercentReturn = 0; // <<< ADDED: Stores the result for the percent-return element
let globalAveragePortfolioValue = 0; // Stores the calculated average portfolio value

// === Helper Function for Filtering ===
/**
 * Evaluates a comparison condition.
 * @param {number} value The value to compare.
 * @param {string} operator The comparison operator (e.g., '>', '<', '==').
 * @param {number} target The target value to compare against.
 * @returns {boolean} True if the condition is met, false otherwise.
 */
function evaluateCondition(value, operator, target) {
    if (isNaN(value) || isNaN(target)) {
        return false; // Cannot compare non-numeric values
    }
    switch (operator) {
        case '>': return value > target;
        case '<': return value < target;
        case '>=': return value >= target;
        case '<=': return value <= target;
        case '==': case '=': return value == target; // Allow both '==' and '='
        case '!=': case '<>': return value != target; // Allow both '!=' and '<>'
        default:
            console.warn(`Unsupported comparison operator: ${operator}`);
            return false;
    }
}


// === Core Functions ===
// newApp.js
// const incBtn = document.getElementById('incrementTrialBtn');
// const decBtn = document.getElementById('decrementTrialBtn');
const trialInput = document.getElementById('trial-select');
const trialDisplay = document.getElementById('trial-number');

// incBtn.addEventListener('click', () => {
//   let val = Number(trialInput.value) || 0;
//   trialInput.value = ++val;
//   trialDisplay.textContent = val;
//   updateChartAndValues(val);
// });

// decBtn.addEventListener('click', () => {
//   let val = Number(trialInput.value) || 0;
//   if (val > 1) trialInput.value = --val;
//   trialDisplay.textContent = val;
//   updateChartAndValues(val);
// });

// Optionally sync manual input changes:
trialInput.addEventListener('input', () => {
  const val = Math.max(1, Number(trialInput.value) || 1);
  trialInput.value = val;
  trialDisplay.textContent = val;
});

/**
 * Processes the data for a given input number.
 * @param {number} num - The identifier for the file input (1-6).
 * @param {object} sip_data - The sip libaray as JSON data.
 * @param {File} library_name - The original file name for status messages.
 */
function processData(num, sip_data, library_name) {
    try {
        distStorage[num.toString()] = sip_data; // Store the parsed data

        // Reset correlation state before checking new file
        // Note: Correlation context is primarily driven by file input '1'
        if (num === 1) {
            correlationMatrixData = null;
            numSips = 0;
            rngParamsArray = [];
        }

        const hasCorrelationMatrix = sip_data.globalVariables?.some(gv => gv.name === 'correlationMatrix');
        const currentNumSips = sip_data.sips?.length || 0;

        // --- Setup Correlation Context (if applicable, based on file 1) ---
        if (num === 1 && hasCorrelationMatrix && currentNumSips > 1) {
            console.log("Correlation matrix found in file 1. Setting up global correlation context.");
            correlationMatrixData = sip_data.globalVariables.find(gv => gv.name === 'correlationMatrix').value;
            numSips = currentNumSips;

            // Prepare RNG params array from file 1
            rngParamsArray = sip_data.sips.map((sip, index) => {
                let rngArgs = null;
                try {
                    const copulaDef = sip_data.U01?.copula?.[0];
                    const copulaRngName = copulaDef?.arguments?.rng?.[index];
                    if (copulaRngName) {
                        rngArgs = sip_data.U01?.rng?.find(r => r.name === copulaRngName)?.arguments;
                    }
                    if (!rngArgs) { rngArgs = sip_data.U01?.rng?.[index]?.arguments; } // Fallback
                } catch (e) { console.warn("Error finding RNG params for SIP", index, e); }

                if (rngArgs) {
                    return { varId: rngArgs.varId, entity: rngArgs.entity, seed3: rngArgs.seed3, seed4: rngArgs.seed4 };
                } else {
                    console.warn(`RNG params not found for SIP index ${index}. Using defaults.`);
                    return { varId: index + 1, entity: 1, seed3: 0, seed4: 0 }; // Default
                }
            });
            console.log("Global RNG Parameters prepared:", rngParamsArray);

        } else if (num === 1) {
             console.log("File 1 loaded: No correlation matrix found or not enough SIPs (<2). Using independent calculations.");
             // Ensure context is clear if file 1 defines independence
             correlationMatrixData = null;
             numSips = 0;
             rngParamsArray = [];
        } else if (hasCorrelationMatrix && currentNumSips > 1) {
             // A subsequent file has correlation, but we only use context from file 1
             console.log(`Correlation matrix found in file ${num}, but global correlation context is determined by file 1.`);
        }
        // --- END Correlation Context Setup ---

        // Update the table and charts for each SIP found in the file
        if (sip_data && sip_data.sips) {
            sip_data.sips.forEach((sip, index) => {
                const inputNumForSip = index + 1; // Map SIP index to input number (1-based)
                // Only update Stocks A, B, C shown in the main table for this example
                if (inputNumForSip >= 1 && inputNumForSip <= 3) {
                     // Pass the full parsed data and the specific index of the SIP to process
                     updateTableAndChartsForInput(inputNumForSip, sip_data, index);
                } else {
                     console.log(`SIP at index ${index} (${sip.name}) not mapped to Stock A, B, or C table rows.`);
                     // Handle updates for other UI elements if needed for inputs > 3
                }
            });

            // Calculate and update the average portfolio value after processing all SIPs
            calculateAndUpdateAveragePortfolioValue(sip_data); // Update the main average display
            recalculateAndStoreFilteredAverage(sip_data); // Calculate and store the filtered average
            updatePortfolioTotal(); // Ensure the percent-return display is updated immediately after file load
        } else {
             console.warn("No SIPs found in parsed data to update table.");
        }

        // Update general UI elements (like upload status)
        // document.getElementById("uploadStatus").textContent = `Library ${library_name} was processed.`;
         // Show the chart container for this input
         const chartDiv = document.getElementById("pdfChart" + num);
         if (chartDiv) chartDiv.style.display = "block";

    } catch (error) {
        console.error("Error processing file:", error);
        let errorMessage = "Error processing file: " + error.message;
        document.getElementById("uploadStatus").textContent = errorMessage;
        // Reset correlation state on error, especially if it was file 1
        if (num === 1) {
            correlationMatrixData = null;
            numSips = 0;
            rngParamsArray = [];
        }
    }
}

/**
 * Processes the uploaded SIPmath/JSON file.
 * @param {number} num - The identifier for the file input (1-6).
 * @param {Event} event - The file input change event.
 */
function fileUploaded(num, event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
        console.error("No file selected or event data missing.");
        document.getElementById("uploadStatus").textContent = "No file selected.";
        return;
    }
    const file_to_read = event.target.files[0];
    const fileread = new FileReader();

    fileread.onload = function(e) {
        const str = e.target.result;
        const parsed = JSON.parse(str);
        processData(num, parsed, file_to_read);
    };
    fileread.readAsText(file_to_read);
}


/**
 * Calculates the average portfolio value across all trials and updates the display.
 * @param {object} parsedData - The parsed JSON/SIPmath data containing SIP information.
 */
function calculateAndUpdateAveragePortfolioValue(parsedData) {
    const numTrials = 10000; // Number of trials to average over
    let totalPortfolioValueSum = 0;

    // Get filter parameters (REMOVED - handled in separate function)
    // const comparisonOperator = cowSign;
    // const targetValueElement = document.getElementById('target-value');
    // const targetValue = targetValueElement ? parseFloat(targetValueElement.value) : NaN;

    if (!parsedData || !parsedData.sips || parsedData.sips.length === 0) {
        console.warn("No SIP data found to calculate average portfolio value.");
        // Clear relevant display elements if needed
         const averagePortfolioValueElement = document.getElementById('average-portfolio-value');
         if (averagePortfolioValueElement) averagePortfolioValueElement.textContent = '$--.--';
        return;
    }

    // Get initial investment values from the input fields
    const initialInvestmentA = parseFloat(document.getElementById('initial-a').value.replace('$', '')) || 0;
    const initialInvestmentB = parseFloat(document.getElementById('initial-b').value.replace('$', '')) || 0;
    const initialInvestmentC = parseFloat(document.getElementById('initial-c').value.replace('$', '')) || 0;

    // Calculate portfolio value for each trial
    for (let trialNum = 1; trialNum <= numTrials; trialNum++) {
        let portfolioValueForTrial = 0;

        // Calculate returns for each stock for the current trial
        parsedData.sips.forEach(sip => {
            // Check if sip name indicates it's one of the stocks A, B, C
            const stockMatch = sip.name.match(/Stock_([ABC])/i);
            if (!stockMatch) return; // Skip if not Stock A, B, or C

            const stockId = stockMatch[1].toUpperCase(); // "A", "B", or "C"
            // --- MODIFIED ---
            const trialReturn = calculateTrialReturn(sip, trialNum); // Use the renamed function
            // --- END MODIFIED ---

            let initialInvestment = 0;
            switch (stockId) {
                case 'A': initialInvestment = initialInvestmentA; break;
                case 'B': initialInvestment = initialInvestmentB; break;
                case 'C': initialInvestment = initialInvestmentC; break;
                default: return; // Should not happen with the check above
            }

            // Calculate the value of the stock for this trial
            if (!isNaN(trialReturn)) { // Ensure return is valid
                 portfolioValueForTrial += initialInvestment * (1 + trialReturn);
            } else {
                 // Handle NaN returns if necessary, maybe skip trial?
                 console.warn(`NaN return for ${sip.name} in trial ${trialNum}`);
            }
        });

        totalPortfolioValueSum += portfolioValueForTrial;

        // Filter condition check (REMOVED - handled in separate function)
        // if (evaluateCondition(portfolioValueForTrial, comparisonOperator, targetValue)) {
        //     filteredPortfolioValueSum += portfolioValueForTrial;
        // }
    }

    // Calculate the average portfolio value across all trials
    const averagePortfolioValue = (numTrials > 0) ? (totalPortfolioValueSum / numTrials) : 0;

    // Filtered average calculation (REMOVED - handled in separate function)
    // globalFilteredSumForPercentReturn = (numTrials > 0) ? (filteredPortfolioValueSum / numTrials) : 0;

    globalAveragePortfolioValue = averagePortfolioValue; // Store globally

    // Update the HTML element with the calculated average portfolio value
    const averagePortfolioValueElement = document.getElementById('average-portfolio-value');
    if (averagePortfolioValueElement) {
        averagePortfolioValueElement.textContent = '$' + averagePortfolioValue.toFixed(2); // Format as currency
    } else {
        console.error("Could not find element with ID 'average-portfolio-value' to update.");
    }
}


/**
 * Recalculates the filtered average based on cowSign and numberStore, storing it globally.
 * @param {object} parsedData - The parsed JSON/SIPmath data (usually distStorage['1']).
 */
function recalculateAndStoreFilteredAverage(parsedData) {
    const numTrials = 10000;
    // let filteredPortfolioValueSum = 0; // Removed: We need the count, not the sum
    let filteredTrialCount = 0; // Added: To count trials meeting the filter

    // Get current filter parameters
    const comparisonOperator = cowSign; // Use the global variable
    const targetValueElement = document.getElementById('target-value');
    let targetValue = targetValueElement ? parseFloat(targetValueElement.value.replace('$', '')) : NaN; // Changed const to let
    console.log(`The tagrgetValue is ${targetValue}`)
    if (!parsedData || !parsedData.sips || parsedData.sips.length === 0) {
        console.warn("No SIP data found to calculate filtered average.");
        globalFilteredSumForPercentReturn = 0; // Reset on missing data
        return;
    }
     if (isNaN(targetValue)) {
          console.warn("Invalid target value for filtering. Using 0 as default target.");
          targetValue = 0; // Default to 0 if input is invalid/empty
          // globalFilteredSumForPercentReturn = 0; // Don't reset here, proceed with calculation using 0
          // return; // Don't return, proceed with calculation
     }

    // Get initial investment values (needed again for trial calculation)
    const initialInvestmentA = parseFloat(document.getElementById('initial-a').value.replace('$', '')) || 0;
    const initialInvestmentB = parseFloat(document.getElementById('initial-b').value.replace('$', '')) || 0;
    const initialInvestmentC = parseFloat(document.getElementById('initial-c').value.replace('$', '')) || 0;

    // Loop through trials to calculate filtered sum
    for (let trialNum = 1; trialNum <= numTrials; trialNum++) {
        let portfolioValueForTrial = 0;

        parsedData.sips.forEach(sip => {
             const stockMatch = sip.name.match(/Stock_([ABC])/i);
             if (!stockMatch) return;
             const stockId = stockMatch[1].toUpperCase();
             // --- MODIFIED ---
             const trialReturn = calculateTrialReturn(sip, trialNum); // Use the renamed function
             // --- END MODIFIED ---

            let initialInvestment = 0;
            switch (stockId) {
                case 'A': initialInvestment = initialInvestmentA; break;
                case 'B': initialInvestment = initialInvestmentB; break;
                case 'C': initialInvestment = initialInvestmentC; break;
                default: return;
            }
             if (!isNaN(trialReturn)) {
                 portfolioValueForTrial += initialInvestment * (1 + trialReturn);
             }
        });

        // Check filter condition and increment count
        if (evaluateCondition(portfolioValueForTrial, comparisonOperator, targetValue)) {
            // filteredPortfolioValueSum += portfolioValueForTrial; // Removed
            filteredTrialCount++; // Increment count
        }
    }

    // Calculate and store the proportion of trials meeting the filter
    globalFilteredSumForPercentReturn = (numTrials > 0) ? (filteredTrialCount / numTrials) : 0;
    console.log(`Recalculated filtered proportion: ${globalFilteredSumForPercentReturn} (${filteredTrialCount}/${numTrials} trials met filter: ${comparisonOperator} ${targetValue})`);
}

/**
 * Updates the relevant row in the investment table and its mini-chart.
 * @param {number} inputNum - The input number (1-6) corresponding to the data/row.
 * @param {object} parsedData - The full parsed JSON/SIPmath data object.
 * @param {number} [sipIndex=0] - The index of the specific SIP within parsedData.sips to process.
 */
function updateTableAndChartsForInput(inputNum, parsedData, sipIndex = 0) {
    if (!parsedData || !parsedData.sips || parsedData.sips.length === 0 || sipIndex >= parsedData.sips.length) {
        console.warn(`No SIP data found for input ${inputNum} at index ${sipIndex} to update table/charts.  ParsedData: ${parsedData}, ParsedData.sips: ${parsedData.sips}, sipIndex: ${sipIndex}`);
        return;
    }

    // Get the specific SIP based on the provided index
    const sip = parsedData.sips[sipIndex];
    if (!sip) { // Extra check
        console.warn(`Could not retrieve SIP at index ${sipIndex} for input ${inputNum}.`);
        return;
    }
    const name = sip.name;
    // Determine which table row corresponds to this input number (e.g., input 1 -> Stock A, input 2 -> Stock B)
    // This mapping needs to be defined based on your UI structure.
    // Example: Assuming input 1 maps to Stock A, 2 to B, etc.
    if (inputNum > 3) {
         console.warn(`Input number ${inputNum} doesn't map to Stock A, B, or C in this example UI.`);
         // If inputs 4, 5, 6 should update other parts of the UI, add that logic here.
         return; // Stop if no mapping for this example
    }
    const stockId = String.fromCharCode(64 + inputNum); // 1->A, 2->B, 3->C

    // Find the stock row in the main table
    const table = document.getElementById('investmentTable');
    const rows = table.getElementsByTagName('tr');
    let stockRow = null;
    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].querySelector('.stock-name');
        if (nameCell && nameCell.getAttribute('data-stock-id') === stockId) {
            stockRow = rows[i];
            break;
        }
    }

    if (stockRow) {
        // Update stock name cell
        const nameCell = stockRow.querySelector('.stock-name');
        if (nameCell) nameCell.textContent = name;

        // Calculate and update return rates using the current trial number
        const trialNumInput = document.getElementById('trial-select');
        const currentTrialNum = trialNumInput ? parseInt(trialNumInput.value) : 1; // Default if input not found

        // --- MODIFIED ---
        const trialReturn = calculateTrialReturn(sip, currentTrialNum); // Get return for current trial
        const simulatedAverage = calculateSimulatedAverageReturn(sip); // Get simulated average return

        const trialCell = stockRow.querySelector('.trial-value');
        const highlightCell = stockRow.querySelector('.highlight'); // Average return cell
        if (trialCell) trialCell.textContent = isNaN(trialReturn) ? 'N/A' : (trialReturn * 100).toFixed(1) + '%';
        if (highlightCell) highlightCell.textContent = isNaN(simulatedAverage) ? 'N/A' : (simulatedAverage * 100).toFixed(1) + '%';
        // --- END MODIFIED ---

         // Update the final value cell based on initial investment and trial return
         updateValueCell(stockId, trialReturn); // Pass the already calculated trialReturn
    } else {
         console.warn(`Could not find table row for Stock ID ${stockId}`);
    }


    // Generate and display the mini-chart for this input
    let labels = [];
    let density = [];
    let maxDensity = 0;

    if (sip.function === "SIP_Array") {
        const resultValues = sip.arguments.value;
        if (resultValues && resultValues.length > 0) {
             maxDensity = Math.max(...resultValues); // Or calculate actual density if needed
             // Simplified density representation for SIP_Array in mini-chart
             density = Array(numBins).fill(maxDensity / numBins); // Example flat distribution
             labels = Array.from({ length: numBins }, (_, i) => i);
        } else {
             density = Array(numBins).fill(0);
             labels = Array.from({ length: numBins }, (_, i) => i);
        }
    } else if (sip.metadata && sip.metadata.density) {
        density = sip.metadata.density;
         if (density && density.length > 0) {
             maxDensity = Math.max(...density);
             labels = Array.from({ length: density.length }, (_, i) => i); // Use actual density length
         } else {
             density = Array(numBins).fill(0);
             labels = Array.from({ length: numBins }, (_, i) => i);
         }
    } else {
         // Default if no density data
         density = Array(numBins).fill(0);
         labels = Array.from({ length: numBins }, (_, i) => i);
    }

    // Ensure density has some values if maxDensity is 0
     if (maxDensity <= 0) maxDensity = 1;


    // Store chart configuration (can be reused by the calculator if needed)
    const cfg = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            data: density,
            backgroundColor: 'rgba(37, 93, 150, 1)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
      
          // moved into `plugins`
          plugins: {
            title:   { display: false },
            legend:  { display: false },
            tooltip: { enabled: false }
          },
      
          // v3+ single-scale objects instead of xAxes/yAxes arrays
          scales: {
            y: {
              display: false,                // hides axis line & ticks
              min: 0,
              max: maxDensity,
              grid: { display: false }       // if you also want to hide grid lines
            },
            x: {
              display: false,
              ticks: { maxTicksLimit: 5 }
            }
          },
      
          elements: {
            point: { radius: 0 }
          },
      
          // still valid—disable hover entirely
          hover: { mode: null }
        }
      };

    // Store chart config using input number as key
    chartList[inputNum.toString()] = cfg;
    chartTitles[inputNum.toString()] = name;

    // Update the specific mini-chart display (e.g., pdfChart1, pdfChart2)
    const chartContainer = document.getElementById('pdfChart' + inputNum);
    if (chartContainer) {
        // Clear any existing chart
        while (chartContainer.firstChild) {
            chartContainer.removeChild(chartContainer.firstChild);
        }
        // Create new canvas element
        const canvas = document.createElement('canvas');
        chartContainer.appendChild(canvas);
        new Chart(canvas, cfg); // Render the chart
    }
}


/**
 * Calculates trial and average returns for a given SIP.
 * Uses correlation if context is active.
 * @param {object} sip - The SIP object.
 * @param {number} trialNum - The specific trial number (1-10000).
 * @returns {number} The calculated return for the specified trial.
 */
function calculateTrialReturn(sip, trialNum = 1) { // Renamed, removed average return logic
    let trialReturn = NaN;
    // Removed: let averageReturn = NaN;

    // Determine if correlation context is active (based on file 1's data)
    const useCorrelation = !!(correlationMatrixData && rngParamsArray && rngParamsArray.length === numSips && numSips > 1);
    const sourceDist = distStorage['1']; // Correlation context always from file 1

    if (sip.function === "Metalog_1_0") {
        let aCoeff = [...sip.arguments.aCoefficients];
        if (aCoeff.length < 16) {
            for (let i = aCoeff.length; i < 16; i++) aCoeff.push(0);
        }
        // Removed: averageReturn = aCoeff[0]; // Average is typically the first coefficient

        try {
            let finalUniform = NaN; // The U[0,1] value to use for uMQ

            if (useCorrelation && sourceDist) {
                // --- Correlated Path ---
                const sipIndex = sourceDist.sips.findIndex(s => s.name === sip.name);

                if (sipIndex !== -1 && rngParamsArray[sipIndex]) {
                    let covMatrix = null;
                    try {
                        // Reconstruct Covariance Matrix
                        const size = correlationMatrixData.columns.length;
                        covMatrix = Array.from({ length: size }, () => Array(size).fill(0));
                        correlationMatrixData.matrix.forEach(item => {
                            const rowIndex = correlationMatrixData.rows.indexOf(item.row);
                            const colIndex = correlationMatrixData.columns.indexOf(item.col);
                            if (rowIndex !== -1 && colIndex !== -1) {
                                covMatrix[rowIndex][colIndex] = item.value;
                            }
                        });
                    } catch (matrixError) {
                        console.error("Error reconstructing covariance matrix:", matrixError);
                        throw new Error("Failed to reconstruct covariance matrix.");
                    }

                    // Generate independent HDR samples for all dimensions
                    let hdrSampleVector = rngParamsArray.map(params =>
                        params ? HDRprng(trialNum, params.varId, params.entity, params.seed3, params.seed4) : Math.random()
                    );

                    // Generate correlated uniforms using Gaussian Copula (now defined below)
                    let correlatedUniformsVector = gaussianCopulaSample(covMatrix, hdrSampleVector); // Removed stochastic. prefix

                    // Extract the uniform for the current SIP
                    finalUniform = correlatedUniformsVector[sipIndex];

                } else {
                    console.warn(`Could not find SIP index or RNG params for ${sip.name} in correlated context. Falling back.`);
                    finalUniform = NaN; // Force fallback
                }
            }

            // If correlation failed or wasn't active, calculate independently
            if (isNaN(finalUniform)) {
                // --- Independent Path ---
                let rngParams;
                // Try to find params even for independent calc (might be from file 1 context)
                const sipIndexFallback = sourceDist?.sips?.findIndex(s => s.name === sip.name);
                 if (sipIndexFallback !== -1 && rngParamsArray && rngParamsArray[sipIndexFallback]) {
                     rngParams = rngParamsArray[sipIndexFallback];
                 } else {
                      // Absolute fallback if no context at all
                      // Find RNG params directly from the current SIP's data if possible
                       try {
                             rngParams = sip.U01?.rng?.[0]?.arguments; // Assuming only one RNG linked directly
                             if (!rngParams) throw new Error("No direct RNG found");
                       } catch {
                            console.warn(`Using default RNG params for independent calc of ${sip.name}`);
                            rngParams = { varId: (sipIndexFallback ?? 0) + 1, entity: 1, seed3: 0, seed4: 0 };
                       }
                 }
                finalUniform = HDRprng(trialNum, rngParams.varId, rngParams.entity, rngParams.seed3, rngParams.seed4);
            }

            // Apply Metalog inverse transform (uMQ)
            trialReturn = uMQ(aCoeff, finalUniform);

            // Apply bounds AFTER uMQ calculation
            let lb = sip.arguments.lowerBound;
            let ub = sip.arguments.upperBound;
            if (!isNaN(trialReturn)) {
                if (lb !== undefined) {
                    if (ub === undefined) { trialReturn = lb + Math.exp(trialReturn); }
                    else { trialReturn = lb + ub * Math.exp(trialReturn) / (1 + Math.exp(trialReturn)); }
                } else if (ub !== undefined) {
                    trialReturn = ub - Math.exp(-trialReturn);
                }
            }

        } catch (error) {
            console.error(`Error calculating Metalog return for ${sip.name}:`, error);
            trialReturn = uMQ(aCoeff, 0.5); // Fallback to median
            // Apply bounds to fallback median
            let lb = sip.arguments.lowerBound;
            let ub = sip.arguments.upperBound;
            if (!isNaN(trialReturn)) {
                if (lb !== undefined) {
                    if (ub === undefined) trialReturn = lb + Math.exp(trialReturn);
                    else trialReturn = lb + ub * Math.exp(trialReturn) / (1 + Math.exp(trialReturn));
                } else if (ub !== undefined) {
                    trialReturn = ub - Math.exp(-trialReturn);
                }
            }
        }

    } else if (sip.function === "SIP_Array") {
        // --- SIP_Array Handling ---
        let values = sip.arguments.value;
        if (!values || values.length === 0) {
            console.warn(`SIP_Array ${sip.name} is empty.`);
            trialReturn = NaN;
            // Removed: averageReturn = NaN;
        } else {
            // Removed: averageReturn = values.reduce((a, b) => a + b, 0) / values.length;
            let valueIndex = -1;

            if (useCorrelation && sourceDist) {
                // Correlated path
                const sipIndex = sourceDist.sips.findIndex(s => s.name === sip.name);
                if (sipIndex !== -1 && rngParamsArray[sipIndex]) {
                    try {
                        // Reconstruct Covariance Matrix
                        const size = correlationMatrixData.columns.length;
                        let covMatrix = Array.from({ length: size }, () => Array(size).fill(0));
                        correlationMatrixData.matrix.forEach(item => {
                            const rIdx = correlationMatrixData.rows.indexOf(item.row);
                            const cIdx = correlationMatrixData.columns.indexOf(item.col);
                            if (rIdx !== -1 && cIdx !== -1) covMatrix[rIdx][cIdx] = item.value;
                        });

                        let hdrSampleVector = rngParamsArray.map(p => p ? HDRprng(trialNum, p.varId, p.entity, p.seed3, p.seed4) : Math.random());
                        let correlatedUniforms = gaussianCopulaSample(covMatrix, hdrSampleVector); // Removed stochastic. prefix
                        let correlatedUniform = correlatedUniforms[sipIndex];

                        // Map uniform to index (empirical inverse CDF)
                        let sortedValues = values.slice().sort((a, b) => a - b);
                        valueIndex = Math.floor(correlatedUniform * sortedValues.length);
                        valueIndex = Math.min(sortedValues.length - 1, Math.max(0, valueIndex));
                        trialReturn = sortedValues[valueIndex];

                    } catch (error) {
                        console.error(`Error calculating correlated SIP_Array for ${sip.name}:`, error);
                        valueIndex = -1; // Force fallback
                    }
                } else {
                    console.warn(`Could not find SIP index/params for SIP_Array ${sip.name} in correlated context.`);
                     valueIndex = -1; // Force fallback
                }
            }

            // Fallback / Independent path
            if (valueIndex === -1) {
                let independentUniform = Math.random(); // Default if no RNG params found
                 try {
                     // Try to get specific RNG for independent case
                     const sipIndexFallback = sourceDist?.sips?.findIndex(s => s.name === sip.name);
                     if (sipIndexFallback !== -1 && rngParamsArray && rngParamsArray[sipIndexFallback]) {
                          const p = rngParamsArray[sipIndexFallback];
                          independentUniform = HDRprng(trialNum, p.varId, p.entity, p.seed3, p.seed4);
                     } else {
                          // Absolute fallback
                          const p = sip.U01?.rng?.[0]?.arguments;
                          if (p) independentUniform = HDRprng(trialNum, p.varId, p.entity, p.seed3, p.seed4);
                     }
                 } catch {}

                valueIndex = Math.floor(independentUniform * values.length); // Use uniform for index selection
                valueIndex = Math.min(values.length - 1, Math.max(0, valueIndex));
                trialReturn = values[valueIndex]; // Use original array order for this simple method
            }
        }
    } else {
        console.warn(`Unsupported function type ${sip.function} in calculateTrialReturn for ${sip.name}.`);
        trialReturn = NaN;
        // Removed: averageReturn = NaN;
    }

    return trialReturn; // Return only the trial return
}


/**
 * Calculates the average return for a given SIP by simulating all trials.
 * @param {object} sip - The SIP object.
 * @returns {number} The average return calculated across 10000 trials.
 */
function calculateSimulatedAverageReturn(sip) {
    const numTrials = 10000;
    let totalReturnSum = 0;
    let validTrials = 0;

    if (!sip) {
        console.warn("calculateSimulatedAverageReturn called with invalid SIP.");
        return NaN;
    }

    for (let trialNum = 1; trialNum <= numTrials; trialNum++) {
        const trialReturn = calculateTrialReturn(sip, trialNum); // Use the dedicated function
        if (!isNaN(trialReturn)) {
            totalReturnSum += trialReturn;
            validTrials++;
        } else {
            // Optionally log or handle NaN returns during averaging
            // console.warn(`NaN return for ${sip.name} in trial ${trialNum} during averaging.`);
        }
    }

    if (validTrials === 0) {
        console.warn(`No valid trials found for averaging ${sip.name}.`);
        return NaN;
    }

    return totalReturnSum / validTrials;
}


/**
 * Performs calculations between two distributions (or constants).
 * Uses correlation if context is active for relevant SIPs.
 * @param {number|string} first - Input ID (1-7) or constant ID (8).
 * @param {string} operator - The mathematical operator (+, -, x, ÷).
 * @param {number|string} second - Input ID (1-7) or constant ID (8).
 * @returns {number[]} An array of 10000 calculated results.
 */
function calculate(first, operator, second) {
    let results = [];
    const numTrials = 10000;
    numberStore = document.getElementById('target-value').value; // Get current constant value

    // Determine if correlation context is active and applicable
    const useCorrelation = !!(correlationMatrixData && rngParamsArray && rngParamsArray.length === numSips && numSips > 1);
    const sourceDist = distStorage['1']; // Correlation context from file 1
    let firstIndex = -1;
    let secondIndex = -1;
    let applyCorrelationToThisPair = false;

    if (useCorrelation && sourceDist) {
        // Check if both inputs are SIPs from the correlated context (file 1)
        firstIndex = (typeof first === 'number' && first < 7) ? first - 1 : -1; // 1-based input to 0-based index
        secondIndex = (typeof second === 'number' && second < 7) ? second - 1 : -1;

        if (firstIndex !== -1 && secondIndex !== -1 &&
            rngParamsArray[firstIndex] && rngParamsArray[secondIndex]) {
            applyCorrelationToThisPair = true;
            console.log("Applying correlated calculation path.");
        } else {
            console.log("Inputs not suitable for correlation (e.g., constant or previous result). Using independent path.");
        }
    } else {
        console.log("Correlation context not active. Using independent path.");
    }


    if (applyCorrelationToThisPair) {
        // --- Correlated Calculation Path ---
        let covMatrix = null;
        try {
            // Reconstruct Covariance Matrix
            const size = correlationMatrixData.columns.length;
            covMatrix = Array.from({ length: size }, () => Array(size).fill(0));
            correlationMatrixData.matrix.forEach(item => {
                const rIdx = correlationMatrixData.rows.indexOf(item.row);
                const cIdx = correlationMatrixData.columns.indexOf(item.col);
                if (rIdx !== -1 && cIdx !== -1) covMatrix[rIdx][cIdx] = item.value;
            });

             // Prepare all inverse functions needed from file 1's SIPs
             const allInverseFns = sourceDist.sips.map((sip, index) => {
                 if (sip.function === "Metalog_1_0") {
                     let aCoeff = [...sip.arguments.aCoefficients];
                     if (aCoeff.length < 16) for (let i = aCoeff.length; i < 16; i++) aCoeff.push(0);
                     const lb = sip.arguments.lowerBound;
                     const ub = sip.arguments.upperBound;
                     return (u) => { // Return the inverse function
                         let val = uMQ(aCoeff, u);
                         if (lb !== undefined) {
                             if (ub === undefined) val = lb + exp(val);
                             else val = lb + ub * exp(val) / (1 + exp(val));
                         } else if (ub !== undefined) {
                             val = ub - exp(-val);
                         }
                         return val;
                     };
                 } else if (sip.function === "SIP_Array") {
                     const values = sip.arguments.value.slice().sort((a, b) => a - b);
                     return (u) => {
                         if (!values || values.length === 0) return NaN;
                         const idx = Math.min(values.length - 1, Math.max(0, Math.floor(u * values.length)));
                         return values[idx];
                     };
                 } else {
                     return (u) => NaN; // Placeholder for unsupported types
                 }
             });


            for (let i = 1; i <= numTrials; i++) {
                // Generate independent HDR samples
                let hdrSample = rngParamsArray.map(p => p ? HDRprng(i, p.varId, p.entity, p.seed3, p.seed4) : Math.random());

                // Generate correlated Metalog samples using the copula (now defined below)
                let correlatedMetalogValues = metalogCopulaSample(covMatrix, hdrSample, allInverseFns); // Removed stochastic. prefix

                // Extract the specific values
                let val1 = correlatedMetalogValues[firstIndex];
                let val2 = correlatedMetalogValues[secondIndex];

                // Perform the operation
                if (operator == "+") results.push(val1 + val2);
                else if (operator == "-") results.push(val1 - val2);
                else if (operator == "x") results.push(val1 * val2);
                else if (operator == "÷") results.push(val1 / val2);
                else results.push(NaN);
            }

        } catch (error) {
            console.error("Error during correlated calculation:", error);
            results = Array(numTrials).fill(NaN); // Fill with NaN on error
        }
        // --- END Correlated Path ---

    } else {
        // --- Independent Calculation Path ---
        console.log("Executing independent calculation path.");
        let hist1 = generateIndependentHistory(first, distStorage, resultDist, numberStore, numTrials);
        let hist2 = generateIndependentHistory(second, distStorage, resultDist, numberStore, numTrials);

        for (let i = 0; i < numTrials; i++) {
            const val1 = hist1[i];
            const val2 = hist2[i];
            if (operator == "+") results.push(val1 + val2);
            else if (operator == "-") results.push(val1 - val2);
            else if (operator == "x") results.push(val1 * val2);
            else if (operator == "÷") results.push(val1 / val2);
            else results.push(NaN);
        }
        // --- END Independent Path ---
    }

    // Ensure results array has correct length
    while (results.length < numTrials) results.push(NaN);
    if (results.length > numTrials) results = results.slice(0, numTrials);

    resultDist = results; // Store the final result distribution globally
    console.log("Calculation finished. Result length:", results.length);
    return results;
}

/**
 * Generates a history of values for a single input, calculated independently.
 * @param {number|string} inputId - Input ID (1-7) or constant ID (8).
 * @param {object} storage - The distStorage object.
 * @param {number[]} resultDistRef - Reference to the global resultDist.
 * @param {string|number} numStoreVal - The current value of the numberStore input.
 * @param {number} nTrials - The number of trials to generate.
 * @returns {number[]} An array of generated values.
 */
function generateIndependentHistory(inputId, storage, resultDistRef, numStoreVal, nTrials) {
    let history = [];
    if (inputId == 7) { // Previous result
        history = resultDistRef.slice();
        while (history.length < nTrials) history.push(0); // Pad or handle differently?
        if (history.length > nTrials) history = history.slice(0, nTrials);
    } else if (inputId == 8) { // Constant number
        const val = parseFloat(numStoreVal);
        for (let i = 0; i < nTrials; i++) history.push(val);
    } else { // Actual distribution from storage
        let parsedData = storage[inputId.toString()];
        if (!parsedData || !parsedData.sips || parsedData.sips.length === 0) {
            console.error(`No data found for input ID ${inputId}. Filling with NaN.`);
            return Array(nTrials).fill(NaN);
        }
        let sip = parsedData.sips[0]; // Assuming one SIP per input ID

        if (sip.function == "Metalog_1_0") {
            let aCoeff = [...sip.arguments.aCoefficients];
            if (aCoeff.length < 16) for (let i = aCoeff.length; i < 16; i++) aCoeff.push(0);

            // Find RNG params for this specific SIP (independent context)
            let rngParams;
             try {
                 rngParams = sip.U01?.rng?.[0]?.arguments; // Assuming only one RNG linked directly
                 if (!rngParams) throw new Error("No direct RNG found");
             } catch {
                 console.warn(`Using default RNG params for independent calc of ${sip.name} in generateIndependentHistory`);
                 rngParams = { varId: inputId, entity: 1, seed3: 0, seed4: 0 }; // Basic default
             }

            let lb = sip.arguments.lowerBound;
            let ub = sip.arguments.upperBound;

            for (let i = 1; i <= nTrials; i++) {
                let r = HDRprng(i, rngParams.varId, rngParams.entity, rngParams.seed3, rngParams.seed4);
                let data = uMQ(aCoeff, r);
                if (lb !== undefined) {
                    if (ub === undefined) data = lb + exp(data);
                    else data = lb + ub * exp(data) / (1 + exp(data));
                } else if (ub !== undefined) {
                    data = ub - exp(-data);
                }
                history.push(data);
            }
        } else if (sip.function == "SIP_Array") {
            let values = sip.arguments.value;
             if (!values || values.length === 0) {
                 console.warn(`SIP_Array for input ${inputId} is empty. Filling with NaN.`);
                 history = Array(nTrials).fill(NaN);
             } else {
                  let independentUniform;
                  for(let i = 1; i <= nTrials; i++) {
                       // Generate a random number for index selection
                       try {
                           const p = sip.U01?.rng?.[0]?.arguments;
                           if (p) independentUniform = HDRprng(i, p.varId, p.entity, p.seed3, p.seed4);
                           else independentUniform = Math.random();
                       } catch { independentUniform = Math.random(); }

                       let index = Math.floor(independentUniform * values.length);
                       index = Math.min(values.length - 1, Math.max(0, index));
                       history.push(values[index]);
                  }
             }
        } else {
            console.error(`Unsupported function type ${sip.function} for input ${inputId}. Filling with NaN.`);
            history = Array(nTrials).fill(NaN);
        }
    }
    return history;
}


// === Helper Math Functions === (Potentially move to newFuncs.js if not already there)
function mod(x, y) { return x % y; }
function LN(x) { return Math.log(x); }
function exp(x) { return Math.exp(x); }

/**
 * HDR Pseudo-Random Number Generator.
 */
function HDRprng(PM_Index, varID, entity, seed3, seed4) {
    var r = (mod((mod(mod(999999999999989, mod(PM_Index * 2499997 + varID * 1800451 + entity * 2000371 + seed3 * 1796777 +
        seed4 * 2299603, 7450589) * 4658 + 7450581) * 383, 99991) * 7440893 + mod(mod(999999999999989,
        mod(PM_Index * 2246527 + varID * 2399993 + entity * 2100869 + seed3 * 1918303 + seed4 * 1624729, 7450987) *
        7580 + 7560584) * 17669, 7440893)) * 1343, 4294967296) + 0.5) / 4294967296;
    return r;
}

/**
 * Metalog Inverse CDF (Quantile Function).
 */
function uMQ(a, r) {
    // Ensure r is within valid bounds to prevent issues with LN
    r = Math.max(1e-15, Math.min(1 - 1e-15, r));
    const rMinusHalf = r - 0.5;
    const logRatio = LN(r / (1 - r)); // Use global LN

    let result = a[0] +
                 a[1] * logRatio +
                 a[2] * rMinusHalf * logRatio +
                 a[3] * rMinusHalf +
                 a[4] * rMinusHalf**2 +
                 a[5] * rMinusHalf**2 * logRatio +
                 a[6] * rMinusHalf**3 +
                 a[7] * rMinusHalf**3 * logRatio +
                 a[8] * rMinusHalf**4 +
                 a[9] * rMinusHalf**4 * logRatio +
                 a[10] * rMinusHalf**5 +
                 a[11] * rMinusHalf**5 * logRatio +
                 a[12] * rMinusHalf**6 +
                 a[13] * rMinusHalf**6 * logRatio +
                 a[14] * rMinusHalf**7 +
                 a[15] * rMinusHalf**7 * logRatio;
    return result;
}

// === DOM Ready Event Listener ===
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // Load all stock buttons dynamically
    const stockButtons = document.querySelectorAll('[id^="Stock_Returns"]');
    stockButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log(`${button.id} button clicked`);
            const dataKey = `stockReturns${index + 1}Data`;
            // Use the stockReturnsData constant from this file instead of window object
            const data = stockReturnsData[index];
            if (data) {
                processData(1, data, button.id);
            } else {
                console.error(`Data for ${button.id} not found in stockReturnsData.`);
                document.getElementById("uploadStatus").textContent = `Error: Data for ${button.id} is not available.`;
            }
        });
    });


    // --- Attach Event Listeners ---


    // Trial Number Input/Buttons
    const trialSelect = document.getElementById('trial-select');
    const trialIncrementBtn = document.querySelector('button[onclick="incrementTrial()"]'); // Find by old onclick

    const trialDecrementBtn = document.querySelector('button[onclick="decrementTrial()"]'); // Find by old onclick

    if (trialSelect) {
        trialSelect.addEventListener('change', updateTrialNumberDisplayAndRecalculate);
    }
    if (trialIncrementBtn) {
         trialIncrementBtn.onclick = null; // Remove old handler
         trialIncrementBtn.addEventListener('click', incrementTrial);
    }
     if (trialDecrementBtn) {
         trialDecrementBtn.onclick = null; // Remove old handler
         trialDecrementBtn.addEventListener('click', decrementTrial);
     }

     // Initial Investment Inputs
     const initialInputs = document.querySelectorAll('.initial-input');
     initialInputs.forEach(input => {
         input.addEventListener('change', (e) => {
             const stockId = e.target.id.split('-')[1].toUpperCase(); // 'initial-a' -> 'A'

             // 1. Update the value cell for the current trial & update totals based on current trial
             updateValueCell(stockId);

             // 2. Recalculate the main average portfolio value across all trials using new investment
             console.log(`Initial investment for ${stockId} changed, recalculating average portfolio value...`);
             if (distStorage['1']) { // Check if data exists
                 calculateAndUpdateAveragePortfolioValue(distStorage['1']); // <<< ADDED THIS CALL

             // 3. Recalculate the filtered average across all trials using new investment
             console.log(`Initial investment for ${stockId} changed, recalculating filtered average...`);
             // No need to check distStorage['1'] again
                 recalculateAndStoreFilteredAverage(distStorage['1']);
                 // 4. Update the total row AGAIN to reflect the new averages in % return and average value
                 updatePortfolioTotal();
             } else {
                 console.warn("Cannot recalculate filtered average: No data loaded for input 1.");
             }
         });
     });

    // Initialize table on load
    updateAllStockReturns();
    updatePortfolioTotal();

    // Listener for the Number Store input
    const numberStoreInput = document.getElementById('target-value');
    if (numberStoreInput) {
        numberStoreInput.addEventListener('change', () => {
            console.log("NumberStore changed, recalculating filtered average...");
            if (distStorage['1']) { // Check if data exists
                recalculateAndStoreFilteredAverage(distStorage['1']);
                updatePortfolioTotal(); // Update UI
            } else {
                console.warn("Cannot recalculate filtered average: No data loaded for input 1.");
            }
        });
    } else {
        console.error("Could not find numberStore input element.");
    }

    // Listener for the Comparison Operator
    const cowSignSelect = document.getElementById('comparison-operator');
    if (cowSignSelect) {
         cowSignSelect.addEventListener('change', (event) => {
             cowSign = event.target.value;
             console.log(`CowSign changed to ${cowSign}, recalculating filtered average...`);
             if (distStorage['1']) {
                 recalculateAndStoreFilteredAverage(distStorage['1']);
                 updatePortfolioTotal();
             } else {
                 console.warn("Cannot recalculate filtered average: No data loaded for input 1.");
             }
         });
    } else {
         console.warn("Could not find cowSign select element. Filtering will use default '>'.");
    }

    // Initial Calculations on Load

}); // End DOMContentLoaded


// === UI Update Functions ===

/** Recalculates and updates trial/value cells for ALL stocks based on current trial number */
function updateAllStockReturns() {
    const trialNumInput = document.getElementById('trial-select');
    const currentTrialNum = trialNumInput ? parseInt(trialNumInput.value) : 1;
    const table = document.getElementById('investmentTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].querySelector('.stock-name');
        if (nameCell) {
            const stockId = nameCell.getAttribute('data-stock-id');
            // Find the corresponding SIP data (assuming it's loaded, likely in distStorage['1'])
            const sipData = distStorage['1']?.sips?.find(s => s.name === nameCell.textContent); // Find by name shown in cell

            if (sipData) {
                // --- MODIFIED ---
                const trialReturn = calculateTrialReturn(sipData, currentTrialNum); // Use renamed function
                // --- END MODIFIED ---
                const trialCell = rows[i].querySelector('.trial-value');
                if (trialCell) trialCell.textContent = isNaN(trialReturn) ? 'N/A' : (trialReturn * 100).toFixed(1) + '%';

                // Update the value cell as well
                updateValueCell(stockId, trialReturn); // Pass the calculated trial return
            } else {
                 // Handle case where data for this stock isn't loaded (maybe clear cells?)
                 const trialCell = rows[i].querySelector('.trial-value');
                 if (trialCell) trialCell.textContent = '-';
                 const valueCell = document.getElementById('value-' + stockId.toLowerCase());
                 if (valueCell) valueCell.textContent = '-';
            }
        }
    }
}

/** Updates the "Value in One Year" cell for a specific stock */
function updateValueCell(stockId, trialReturn) { // trialReturn is now passed in
    const initialInput = document.getElementById('initial-' + stockId.toLowerCase());
    const valueCell = document.getElementById('value-' + stockId.toLowerCase());

    if (initialInput && valueCell) {
         try {
             const initialValue = parseFloat(initialInput.value.replace('$', ''));
             if (isNaN(initialValue)) {
                 valueCell.textContent = 'Invalid Initial';
                 return;
             }
             // If trialReturn wasn't passed, recalculate it (should be passed now, but keep as fallback)
             if (trialReturn === undefined) {
                 console.warn(`updateValueCell called for ${stockId} without trialReturn. Recalculating.`);
                 const nameCell = document.querySelector(`.stock-name[data-stock-id="${stockId}"]`);
                 const sipData = distStorage['1']?.sips?.find(s => s.name === nameCell?.textContent);
                 if (sipData) {
                     const trialNumInput = document.getElementById('trial-select');
                     const currentTrialNum = trialNumInput ? parseInt(trialNumInput.value) : 1;
                     // --- MODIFIED ---
                     trialReturn = calculateTrialReturn(sipData, currentTrialNum); // Use renamed function
                     // --- END MODIFIED ---
                 } else {
                      trialReturn = NaN; // Cannot calculate if SIP data missing
                  }
             }


             if (isNaN(trialReturn)) {
                 valueCell.textContent = 'N/A';
             } else {
                 const newValue = initialValue * (1 + trialReturn);
                 valueCell.textContent = '$' + newValue.toFixed(2);
             }
         } catch (e) {
              console.error("Error updating value cell for", stockId, e);
              valueCell.textContent = 'Error';
         }
    }
     // After updating a value cell, always update the portfolio total
     updatePortfolioTotal();
}


/** Updates the trial number display and recalculates all stock returns/values */
function updateTrialNumberDisplayAndRecalculate() {
    const select = document.getElementById('trial-select');
    let trialNumber = parseInt(select.value);

    // Ensure value is within range
    if (isNaN(trialNumber) || trialNumber < 1) {
        trialNumber = 1;
        select.value = 1;
    } else if (trialNumber > 10000) {
        trialNumber = 10000;
        select.value = 10000;
    }

    document.getElementById('trial-number').textContent = trialNumber;

    // Update table values based on new trial
    updateAllStockReturns();
    updatePortfolioTotal(); // Recalculate totals after individual values change
}

/** Increments the trial number */
function incrementTrial() {
    const select = document.getElementById('trial-select');
    let currentValue = parseInt(select.value);
    if (!isNaN(currentValue) && currentValue < 10000) {
        select.value = currentValue + 1;
        updateTrialNumberDisplayAndRecalculate();
    }
}

/** Decrements the trial number */
function decrementTrial() {
    const select = document.getElementById('trial-select');
    let currentValue = parseInt(select.value);
    if (!isNaN(currentValue) && currentValue > 1) {
        select.value = currentValue - 1;
        updateTrialNumberDisplayAndRecalculate();
    }
}

/** Updates the portfolio total row based on current values */
function updatePortfolioTotal() {
    let totalValue = 0;
    let initialTotal = 0;

    ['a', 'b', 'c'].forEach(stockId => {
        const initialInput = document.getElementById('initial-' + stockId);
        const valueCell = document.getElementById('value-' + stockId);

        if (initialInput && valueCell) {
            const initialVal = parseFloat(initialInput.value.replace('$', ''));
            const currentVal = parseFloat(valueCell.textContent.replace('$', ''));

            if (!isNaN(initialVal)) initialTotal += initialVal;
            if (!isNaN(currentVal)) totalValue += currentVal;
        }
    });

    // Update totals in the table
    document.getElementById('initial-total').textContent = '$' + initialTotal.toFixed(2);
    document.getElementById('current-total').textContent = '$' + totalValue.toFixed(2);

    // Update the average portfolio value display using the global variable
    const averagePortfolioValueElement = document.getElementById('average-portfolio-value');
    if (averagePortfolioValueElement) {
        averagePortfolioValueElement.textContent = '$' + globalAveragePortfolioValue.toFixed(2);
    }

    // <<< MODIFIED: Use the globally calculated filtered average sum / total trials
    // Note: The result is an average value, not a percentage, but displaying as requested.
    const valueForPercentReturn = globalFilteredSumForPercentReturn;
    document.getElementById('percent-return').textContent = ((valueForPercentReturn) * 100).toFixed(0) + '%';
}


// --- TODO: Add event listeners for the calculator part (.keys, .cowSign etc.) ---
// --- Need to integrate the calculator logic within the DOMContentLoaded or separate functions ---

// === Stochastic Tools Functions (moved from newFuncs.js) ===

// NormSInv using Acklam/Wichura rational approximation
function normSInv(p) { // Removed 'export'
    if (p <= 0 || p >= 1) throw new Error("p must be in (0,1)");

    const a = [-39.696830, 220.946098, -275.928510, 138.357751, -30.664798, 2.506628];
    const b = [-54.476098, 161.585836, -155.698980, 66.801311, -13.280681];
    const c = [-0.0077849, -0.322396, -2.400758, -2.549733, 4.374664, 2.938164];
    const d = [0.0077847, 0.322467, 2.445134, 3.754409];

    const plow = 0.02425;
    const phigh = 1 - plow;
    let q, r;

    if (p < plow) {
        q = Math.sqrt(-2 * Math.log(p));
        return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
               ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1);
    } else if (p > phigh) {
        q = Math.sqrt(-2 * Math.log(1 - p));
        return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
                 ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1);
    } else {
        q = p - 0.5;
        r = q * q;
        return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5]) * q /
               (((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1);
    }
}

// Cholesky decomposition for symmetric positive-definite matrices
function cholesky(matrix) { // Removed 'export'
    const n = matrix.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = 0;
            for (let k = 0; k < j; k++) {
                sum += L[i][k] * L[j][k];
            }
            if (i === j) {
                const val = matrix[i][i] - sum;
                if (val <= 0) throw new Error("Matrix is not positive definite");
                L[i][j] = Math.sqrt(val);
            } else {
                L[i][j] = (matrix[i][j] - sum) / L[j][j];
            }
        }
    }
    return L;
}

// === gaussian-copula.js === (Internal helper functions)

// Convert uniform to normal
function uniformsToNormals(u) {
  return u.map(normSInv);
}

// Apply Cholesky factor to normal vector
function applyCholesky(L, z) {
  const n = z.length;
  const result = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      result[i] += L[i][j] * z[j];
    }
  }
  return result;
}

// Standard normal CDF
function normCDF(x) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

// Error function approximation
function erf(x) {
  const sign = Math.sign(x);
  x = Math.abs(x);

  const a1 =  0.254829592, a2 = -0.284496736,
        a3 =  1.421413741, a4 = -1.453152027,
        a5 =  1.061405429, p  = 0.3275911;

  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));
  return sign * y;
}

// Generate dependent uniforms from HDR using Gaussian copula
function gaussianCopulaSample(covMatrix, hdrSample) { // Removed 'export'
    const L = cholesky(covMatrix);
    const z = uniformsToNormals(hdrSample);
    const correlated = applyCholesky(L, z);
    return correlated.map(normCDF);
}

// Generate dependent Metalog samples from HDR + Copula
function metalogCopulaSample(covMatrix, hdrSample, metalogInverseFnArray) { // Removed 'export'
    const uCorrelated = gaussianCopulaSample(covMatrix, hdrSample);
    // Add safety check for metalogInverseFnArray length
    if (!metalogInverseFnArray || metalogInverseFnArray.length !== uCorrelated.length) {
        console.error(`Mismatched lengths in metalogCopulaSample: uniforms=${uCorrelated.length}, functions=${metalogInverseFnArray?.length}`);
        // Return NaNs or throw error, depending on desired handling
        return uCorrelated.map(() => NaN);
    }
    return uCorrelated.map((u, i) => {
         // Add safety check for individual function existence
         if (typeof metalogInverseFnArray[i] === 'function') {
             return metalogInverseFnArray[i](u);
         } else {
              console.warn(`No valid inverse function found for index ${i} in metalogCopulaSample`);
              return NaN;
         }
    });
}
// Add functionality for loading .SIPmath files when sipmath-loader buttons are clicked

/**
 * Loads a .SIPmath file and integrates it into the application.
 * @param {string} fileId - The ID of the button, which corresponds to the file name to load.
 */
function loadSipmathFile(fileId) {
    // Construct the file name from the button ID
    const fileName = './' + fileId + '.SIPmath';

    // Read the file from the current workspace directory
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(text => {
            try {
                // Parse the file content
                const parsed = JSON.parse(text);
                distStorage[fileId] = parsed; // Store the parsed data

                // Reset correlation state before checking new file
                // Note: Correlation context is primarily driven by file input '1'
                if (fileId === '1') {
                    correlationMatrixData = null;
                    numSips = 0;
                    rngParamsArray = [];
                }

                const hasCorrelationMatrix = parsed.globalVariables?.some(gv => gv.name === 'correlationMatrix');
                const currentNumSips = parsed.sips?.length || 0;

                // --- Setup Correlation Context (if applicable, based on file 1) ---
                if (fileId === '1' && hasCorrelationMatrix && currentNumSips > 1) {
                    console.log("Correlation matrix found in file 1. Setting up global correlation context.");
                    correlationMatrixData = parsed.globalVariables.find(gv => gv.name === 'correlationMatrix').value;
                    numSips = currentNumSips;

                    // Prepare RNG params array from file 1
                    rngParamsArray = parsed.sips.map((sip, index) => {
                        let rngArgs = null;
                        try {
                            const copulaDef = parsed.U01?.copula?.[0];
                            const copulaRngName = copulaDef?.arguments?.rng?.[index];
                            if (copulaRngName) {
                                rngArgs = parsed.U01?.rng?.find(r => r.name === copulaRngName)?.arguments;
                            }
                            if (!rngArgs) { rngArgs = parsed.U01?.rng?.[index]?.arguments; } // Fallback
                        } catch (e) { console.warn("Error finding RNG params for SIP", index, e); }

                        if (rngArgs) {
                            return { varId: rngArgs.varId, entity: rngArgs.entity, seed3: rngArgs.seed3, seed4: rngArgs.seed4 };
                        } else {
                            console.warn(`RNG params not found for SIP index ${index}. Using defaults.`);
                            return { varId: index + 1, entity: 1, seed3: 0, seed4: 0 }; // Default
                        }
                    });
                    console.log("Global RNG Parameters prepared:", rngParamsArray);

                } else if (fileId === '1') {
                     console.log("File 1 loaded: No correlation matrix found or not enough SIPs (<2). Using independent calculations.");
                     // Ensure context is clear if file 1 defines independence
                     correlationMatrixData = null;
                     numSips = 0;
                     rngParamsArray = [];
                } else if (hasCorrelationMatrix && currentNumSips > 1) {
                     // A subsequent file has correlation, but we only use context from file 1
                     console.log(`Correlation matrix found in file ${fileId}, but global correlation context is determined by file 1.`);
                }
                // --- END Correlation Context Setup ---

                // Update the table and charts for each SIP found in the file
                if (parsed && parsed.sips) {
                    parsed.sips.forEach((sip, index) => {
                        const inputNumForSip = index + 1; // Map SIP index to input number (1-based)
                        // Only update Stocks A, B, C shown in the main table for this example
                        if (inputNumForSip >= 1 && inputNumForSip <= 3) {
                             // Pass the full parsed data and the specific index of the SIP to process
                             updateTableAndChartsForInput(inputNumForSip, parsed, index);
                        } else {
                             console.log(`SIP at index ${index} (${sip.name}) not mapped to Stock A, B, or C table rows.`);
                             // Handle updates for other UI elements if needed for inputs > 3
                        }
                    });

                    // Calculate and update the average portfolio value after processing all SIPs
                    calculateAndUpdateAveragePortfolioValue(parsed); // Update the main average display
                    recalculateAndStoreFilteredAverage(parsed); // Calculate and store the filtered average
                    updatePortfolioTotal(); // Ensure the percent-return display is updated immediately after file load
                } else {
                     console.warn("No SIPs found in parsed data to update table.");
                }

                // Update general UI elements (like upload status)
                document.getElementById("uploadStatus").textContent = `Library ${fileName} was processed.`;

                // Show the chart container for this input
                const chartDiv = document.getElementById("pdfChart" + fileId);
                if (chartDiv) chartDiv.style.display = "block";
            } catch (error) {
                console.error("Error processing file:", error);
                document.getElementById("uploadStatus").textContent = "Error processing file: " + error.message;
                // Reset correlation state on error, especially if it was file 1
                if (fileId === '1') {
                    correlationMatrixData = null;
                    numSips = 0;
                    rngParamsArray = [];
                }
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            const uploadStatus = document.getElementById("uploadStatus");
            if (uploadStatus) {
                uploadStatus.textContent = "Error loading file: " + error.message;
            } else {
                console.warn("uploadStatus element not found");
            }
            // Reset correlation state on error, especially if it was file 1
            if (fileId === '1') {
                correlationMatrixData = null;
                numSips = 0;
                rngParamsArray = [];
            }
        });
}
