// SipCalc - CSP Compliant Version
// All eval() calls removed, proper event handling implemented

// Global variables
var numberStore = 0;
var distStorage = {};
var chartList = {};
var chartTitles = {};
var numBins = 20;
var resultDist = [];
var numGreater = 0;
var cowSign = ">";

// Safe comparison function to replace eval()
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

// DOM Ready function
function initializeApp() {
    console.log('Initializing SipCalc...');
    
    // Setup all event listeners
    setupEventListeners();
    setupSipLinkInterceptor();
    setupSipUrlParamLoader();
    
    console.log('SipCalc initialization complete');
}

// Setup all event listeners
function setupEventListeners() {
    // Chance input
    const chanceInput = document.getElementById("chanceInput");
    if (chanceInput) {
        chanceInput.addEventListener("change", handleChanceInput);
    }
    
    // Cow button (comparison operator)
    const cowBtn = document.getElementById("cowBtn");
    if (cowBtn) {
        cowBtn.addEventListener("click", handleCowButton);
    }
    
    // File inputs
    for (let i = 1; i <= 6; i++) {
        const fileInput = document.getElementById("fileInput" + i);
        if (fileInput) {
            fileInput.addEventListener("change", (e) => fileUploaded(i, e));
        }
    }
    
    // Calculator keys
    const keys = document.querySelectorAll('.keys');
    keys.forEach(key => {
        key.addEventListener('click', handleKeyClick);
    });
    
    // Popup event listeners
    setupPopupEventListeners();
    
    console.log('Event listeners setup complete');
}

// Handle chance input changes
function handleChanceInput() {
    const num = document.getElementById("chanceInput").value;
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
}

// Handle cow button clicks (comparison operators)
function handleCowButton() {
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
    
    // Recalculate with new operator
    handleChanceInput();
}

// Handle calculator key clicks
function handleKeyClick() {
    const action = this.getAttribute("data-action");
    const num = this.getAttribute("data-num");
    
    if (action === "clear") {
        clearCalculator();
    } else if (num) {
        handleNumberInput(num);
    }
}

// Clear calculator
function clearCalculator() {
    document.getElementById("chartHolder1").style.display = "none";
    document.getElementById("chartHolder2").style.display = "none";
    document.getElementById("numHolder1").style.display = "none";
    document.getElementById("numHolder2").style.display = "none";
    document.getElementById("displayName1").innerHTML = "";
    document.getElementById("displayName2").innerHTML = "";
    document.getElementById('operator').innerHTML = "";
    document.getElementById('equal').innerHTML = "";
    document.getElementById('chainedOperator').innerHTML = "";
    document.getElementById('chainedOperator').style.display = "none";
    
    // Reset calculator state
    const gridContainer = document.getElementById('gridContainer');
    if (gridContainer) {
        gridContainer.setAttribute('data-firstdist', '0');
        gridContainer.setAttribute('data-seconddist', '0');
        gridContainer.setAttribute('data-operator', 'add');
        gridContainer.setAttribute('data-previouskeytype', 'graph');
        gridContainer.setAttribute('data-lastposition', 'none');
    }
}

// Handle number input
function handleNumberInput(num) {
    const gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) return;
    
    const lastPosition = gridContainer.getAttribute('data-lastposition');
    const previousKeyType = gridContainer.getAttribute('data-previouskeytype');
    
    if (previousKeyType === "graph") {
        gridContainer.setAttribute('data-firstdist', num);
        gridContainer.setAttribute('data-lastposition', 'first');
        
        if (num == 8) {
            document.getElementById("chartHolder1").style.display = "none";
            document.getElementById("numHolder1").style.display = "flex";
            document.getElementById("numHolder1").innerHTML = numberStore;
        } else {
            document.getElementById("numHolder1").style.display = "none";
            document.getElementById("chartHolder1").style.display = "flex";
            
            if (chartList[num]) {
                const chart1 = document.getElementById('chart1');
                if (chart1) {
                    new Chart(chart1, chartList[num]);
                }
            }
            
            if (num == 7) {
                document.getElementById("displayName1").innerHTML = "Previous Result";
            } else {
                document.getElementById("displayName1").innerHTML = chartTitles[num] || "Distribution " + num;
            }
        }
        
        document.getElementById("displayName1").style.opacity = "1";
    }
}

// File upload handler
function fileUploaded(num, event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
        console.error("No file selected or event data missing.");
        return;
    }
    
    const file_to_read = event.target.files[0];
    const fileread = new FileReader();

    fileread.onload = function(e) {
        try {
            const str = e.target.result;
            const parsed = JSON.parse(str);
            processData(num, parsed, file_to_read);
        } catch (error) {
            console.error("Error parsing file:", error);
        }
    };
    
    fileread.readAsText(file_to_read);
}

// Process uploaded data
function processData(num, sip_data, library_name) {
    try {
        distStorage[num.toString()] = sip_data;
        
        if (sip_data && sip_data.sips && sip_data.sips.length > 0) {
            const sip = sip_data.sips[0];
            const name = sip.name;
            
            const nameElement = document.getElementById("name" + num);
            if (nameElement) {
                nameElement.innerHTML = name;
                nameElement.style.opacity = "1";
            }
            
            chartTitles[num.toString()] = name;
            
            // Create chart configuration
            if (sip.function === "SIP_Array") {
                const resultValues = sip.arguments.value;
                const max = Math.max(...resultValues);
                
                const labels = [];
                const density = [];
                
                for (let i = 0; i < numBins; i++) {
                    labels.push(i);
                    density.push(max);
                }
                
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
                        responsive: true,
                        maintainAspectRatio: false
                    }
                };
                
                chartList[num.toString()] = cfg;
                
                // Create chart
                const chartElement = document.getElementById("pdfChart" + num);
                if (chartElement) {
                    new Chart(chartElement, cfg);
                }
            }
        }
    } catch (error) {
        console.error("Error processing data:", error);
    }
}

// Popup functionality
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
        chooseFileBtn.addEventListener('click', () => {
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

// Load library from popup
function loadLibraryFromPopup() {
    const fileOption = document.getElementById("fileOption");
    const urlInput = document.getElementById("urlInput");
    const popupFileInput = document.getElementById("popupFileInput");
    
    if (!fileOption || !urlInput || !popupFileInput) {
        console.error("Required popup elements not found");
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

// SIP Link Interceptor (CSP-compliant)
function setupSipLinkInterceptor() {
    function handleClick(e) {
        try {
            // Basic validation
            if (!e || !e.target) return;
            
            // Skip if this is a form submission, button click, or input interaction
            if (e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'INPUT' || 
                e.target.tagName === 'SELECT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.closest('form') ||
                e.target.closest('.popup-content')) {
                return;
            }
            
            // Find the closest anchor tag
            let anchor = e.target;
            while (anchor && anchor.tagName !== 'A') {
                anchor = anchor.parentElement;
                if (!anchor) return;
            }
            
            if (!anchor || !anchor.href) return;
            
            // Skip if it's a target="_blank" link
            if (anchor.getAttribute('target') === '_blank') return;
            
            // Skip if it's inside a popup or form
            if (anchor.closest('.popup-content') || anchor.closest('form')) {
                return;
            }
            
            let resolved;
            try {
                resolved = new URL(anchor.href);
            } catch (err) {
                return;
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

// Auto-load from URL parameter
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
        });
}

// Load library from URL
async function loadLibraryFromUrl(url) {
    try {
        console.log('Loading library from URL:', url);
        
        // Validate URL format
        const urlObj = new URL(url, window.location.href);
        console.log('Resolved URL:', urlObj.href);
        
        // Check for common hosting platforms and adjust URL if needed
        const adjustedUrl = adjustUrlForHostingPlatform(urlObj.href);
        console.log('Adjusted URL:', adjustedUrl);
        
        // Try fetch first, then fallback to XMLHttpRequest
        try {
            return await loadWithFetch(adjustedUrl);
        } catch (fetchError) {
            console.log('Fetch failed, trying XMLHttpRequest:', fetchError.message);
            return await loadWithXMLHttpRequest(adjustedUrl);
        }
        
    } catch (error) {
        console.error('Error in loadLibraryFromUrl:', error);
        throw new Error(`Failed to load library: ${error.message}`);
    }
}

// Load using fetch API
async function loadWithFetch(url) {
    console.log('Attempting fetch from:', url);
    
    let response;
    
    // Try to use AbortSignal.timeout if available, otherwise use AbortController
    if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
            },
            signal: AbortSignal.timeout(30000)
        });
    } else {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        try {
            response = await fetch(url, {
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
}

// Load using XMLHttpRequest (fallback)
function loadWithXMLHttpRequest(url) {
    return new Promise((resolve, reject) => {
        console.log('Attempting XMLHttpRequest from:', url);
        
        const xhr = new XMLHttpRequest();
        const timeout = setTimeout(() => {
            xhr.abort();
            reject(new Error('Request timed out'));
        }, 30000);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                clearTimeout(timeout);
                
                if (xhr.status === 200) {
                    console.log('XMLHttpRequest successful:', xhr.status, xhr.statusText);
                    
                    try {
                        const libraryJson = JSON.parse(xhr.responseText);
                        console.log('Successfully parsed as JSON via XMLHttpRequest');
                        resolve(libraryJson);
                    } catch (parseError) {
                        console.log('JSON parsing failed, trying SIPmath format via XMLHttpRequest');
                        resolve(parseSIPmathFormat(xhr.responseText));
                    }
                } else {
                    reject(new Error(`HTTP error! status: ${xhr.status} - ${xhr.statusText}`));
                }
            }
        };
        
        xhr.onerror = function() {
            clearTimeout(timeout);
            reject(new Error('Network error occurred'));
        };
        
        xhr.ontimeout = function() {
            clearTimeout(timeout);
            reject(new Error('Request timed out'));
        };
        
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xhr.send();
    });
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
    
    // Google Drive direct link
    if (urlObj.hostname === 'drive.google.com' && urlObj.pathname.includes('/file/d/')) {
        const fileId = urlObj.pathname.match(/\/file\/d\/([^\/]+)/)?.[1];
        if (fileId) {
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
    }
    
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
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    
    throw lastError;
}

// Function to parse SIPmath format
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

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
} 