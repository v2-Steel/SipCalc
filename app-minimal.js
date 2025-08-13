// SipCalc - Minimal Version (No eval, No preventDefault issues)
console.log('Loading SipCalc minimal version...');

// Global variables
var numberStore = 0;
var distStorage = {};
var chartList = {};
var chartTitles = {};
var numBins = 20;
var resultDist = [];
var numGreater = 0;
var cowSign = ">";

// Safe comparison function (replaces eval)
function safeCompare(value1, operator, value2) {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    
    if (isNaN(num1) || isNaN(num2)) return false;
    
    switch(operator) {
        case '>': return num1 > num2;
        case '<': return num1 < num2;
        case '>=': return num1 >= num2;
        case '<=': return num1 <= num2;
        case '==': return num1 === num2;
        case '!=': return num1 !== num2;
        default: return false;
    }
}

// Basic file upload handler
function fileUploaded(num, event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
        console.error("No file selected");
        return;
    }
    
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            distStorage[num.toString()] = parsed;
            
            if (parsed.sips && parsed.sips.length > 0) {
                const name = parsed.sips[0].name;
                const nameElement = document.getElementById("name" + num);
                if (nameElement) {
                    nameElement.innerHTML = name;
                    nameElement.style.opacity = "1";
                }
                chartTitles[num.toString()] = name;
            }
        } catch (error) {
            console.error("Error parsing file:", error);
        }
    };
    
    reader.readAsText(file);
}

// Popup functions
function showLibraryPopup() {
    const popup = document.getElementById("libraryPopup");
    if (popup) {
        popup.style.display = "flex";
        
        // Reset form
        const selectedFileName = document.getElementById("selectedFileName");
        if (selectedFileName) selectedFileName.innerHTML = "";
        
        const urlInput = document.getElementById("urlInput");
        if (urlInput) urlInput.value = "";
        
        const fileOption = document.getElementById("fileOption");
        if (fileOption) fileOption.checked = true;
        
        const fileSection = document.getElementById("fileSection");
        const urlSection = document.getElementById("urlSection");
        if (fileSection) fileSection.style.display = "block";
        if (urlSection) urlSection.style.display = "none";
    }
}

function hideLibraryPopup() {
    const popup = document.getElementById("libraryPopup");
    if (popup) {
        popup.style.display = "none";
    }
}

// Load library from popup
function loadLibraryFromPopup() {
    const fileOption = document.getElementById("fileOption");
    const urlInput = document.getElementById("urlInput");
    const popupFileInput = document.getElementById("popupFileInput");
    
    if (!fileOption || !urlInput || !popupFileInput) {
        console.error("Required elements not found");
        return;
    }
    
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
        
        loadLibraryFromUrl(rawUrl)
            .then((libraryJson) => {
                processLibraryJson(libraryJson);
                hideLibraryPopup();
            })
            .catch((error) => {
                alert(error.message || 'Failed to load library from URL.');
            });
    }
}

// Process library JSON
function processLibraryJson(libraryJson) {
    console.log('Processing library JSON:', libraryJson);
    
    if (!libraryJson || !libraryJson.sips) {
        alert('Invalid library format: No SIPs found');
        return;
    }
    
    libraryJson.sips.forEach((sip, i) => {
        const singleSIP = {
            name: sip.name || "SIP Library",
            dateCreated: libraryJson.dateCreated || new Date().toISOString(),
            provenance: libraryJson.provenance || "unknown",
            U01: libraryJson.U01 || {},
            globalVariables: libraryJson.globalVariables || [],
            sips: [sip]
        };
        
        console.log('Processing SIP:', singleSIP);
        
        // Convert to blob and create file
        const blob = new Blob([JSON.stringify(singleSIP, null, 2)], { type: 'application/json' });
        const file = new File([blob], `sip_${i + 1}.json`, { type: 'application/json' });
        
        // Create data transfer and set files
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        
        const input = document.getElementById('fileInput' + (i + 1));
        if (input) {
            input.files = dataTransfer.files;
            // Trigger the file upload handler
            const event = { target: { files: dataTransfer.files } };
            fileUploaded(i + 1, event);
        }
    });
}

// Load library from URL
async function loadLibraryFromUrl(url) {
    try {
        console.log('Loading library from URL:', url);
        
        // Validate URL format
        const urlObj = new URL(url, window.location.href);
        console.log('Resolved URL:', urlObj.href);
        
        // Fetch the file
        const response = await fetch(urlObj.href);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
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
        throw new Error(`Failed to load library: ${error.message}`);
    }
}

// Parse SIPmath format
function parseSIPmathFormat(text) {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('SIPmath format parsing not yet implemented for this format');
    } catch (error) {
        throw new Error('Unable to parse the file format. Please ensure it\'s a valid SIP library file.');
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Chance input
    const chanceInput = document.getElementById("chanceInput");
    if (chanceInput) {
        chanceInput.addEventListener("change", function() {
            const num = this.value;
            numGreater = 0;
            
            for (let i = 0; i < resultDist.length; i++) {
                if (safeCompare(resultDist[i], cowSign, num)) {
                    numGreater++;
                }
            }
            
            const percent = (numGreater / resultDist.length) * 100;
            const chanceOut = document.getElementById("chanceOut");
            if (chanceOut) {
                chanceOut.innerHTML = percent.toFixed(2) + "%";
            }
        });
    }
    
    // Cow button (comparison operator)
    const cowBtn = document.getElementById("cowBtn");
    if (cowBtn) {
        cowBtn.addEventListener("click", function() {
            const cowDrop = document.getElementById("cowDrop");
            if (!cowDrop) return;
            
            const currentLeft = cowDrop.style.left;
            if (currentLeft === "79vw") {
                cowDrop.style.left = "70vw";
                document.getElementById("cowSymb").innerHTML = ">";
                cowSign = ">";
            } else {
                cowDrop.style.left = "79vw";
                document.getElementById("cowSymb").innerHTML = "=";
                cowSign = "==";
            }
        });
    }
    
    // File inputs
    for (let i = 1; i <= 6; i++) {
        const fileInput = document.getElementById("fileInput" + i);
        if (fileInput) {
            fileInput.addEventListener("change", (e) => fileUploaded(i, e));
        }
    }
    
    // Popup event listeners
    setupPopupEventListeners();
    
    console.log('Event listeners setup complete');
}

// Setup popup event listeners
function setupPopupEventListeners() {
    // Load Library button
    const loadLibraryBtn = document.getElementById('loadLibraryBtn');
    if (loadLibraryBtn) {
        loadLibraryBtn.addEventListener('click', showLibraryPopup);
    }
    
    // Close popup button
    const closePopupBtn = document.getElementById('closePopupBtn');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hideLibraryPopup);
    }
    
    // Choose file button
    const chooseFileBtn = document.getElementById('chooseFileBtn');
    if (chooseFileBtn) {
        chooseFileBtn.addEventListener('click', function() {
            const fileInput = document.getElementById('popupFileInput');
            if (fileInput) fileInput.click();
        });
    }
    
    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideLibraryPopup);
    }
    
    // Load button
    const loadBtn = document.getElementById('loadBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', loadLibraryFromPopup);
    }
    
    // File/URL option toggles
    const fileOption = document.getElementById("fileOption");
    const urlOption = document.getElementById("urlOption");
    const fileSection = document.getElementById("fileSection");
    const urlSection = document.getElementById("urlSection");
    
    if (fileOption && urlOption && fileSection && urlSection) {
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
    }
    
    // File selection handler
    const popupFileInput = document.getElementById("popupFileInput");
    if (popupFileInput) {
        popupFileInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name || "";
            const selectedFileName = document.getElementById("selectedFileName");
            if (selectedFileName) {
                selectedFileName.innerHTML = fileName ? `Selected: ${fileName}` : "";
            }
        });
    }
    
    // Close popup when clicking outside
    const popup = document.getElementById("libraryPopup");
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                hideLibraryPopup();
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById("libraryPopup");
            if (popup && popup.style.display === 'flex') {
                hideLibraryPopup();
            }
        }
    });
}

// Initialize the app
function initializeApp() {
    console.log('Initializing SipCalc minimal version...');
    setupEventListeners();
    console.log('SipCalc minimal version ready!');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
} 