// Calling the background page.
var conversionsAvailable = chrome.extension.getBackgroundPage().conversionsAvailable;
var conversionsKeys = chrome.extension.getBackgroundPage().conversionsKeys;
var conversionChosen = chrome.extension.getBackgroundPage().conversionChosen;

// HTML elements
var leftInput = document.getElementById("leftInput");
var rightInput = document.getElementById("rightInput");
var conversionTypeSelector = document.getElementById("types");

// Add available conversions to the select element.
conversionsKeys.forEach(function(conversion) {
    var optionElement = document.createElement('option');
    optionElement.innerHTML = conversion;
    optionElement.value = conversion;
    conversionTypeSelector.appendChild(optionElement); 
});

// Event listeners.
leftInput.addEventListener("input", leftInputChanged);
rightInput.addEventListener("input", rightInputChanged);
conversionTypeSelector.addEventListener("change", typeSelected)

/**
 * Event handlers functions.
 */

/**
 * Event handler when the left input changes.
 */
function leftInputChanged() {
    rightInput.value = processEncoding(leftInput.value);
}

/**
 * Event handler when the right input changes.
 */
function rightInputChanged() {
    leftInput.value = processDecoding(rightInput.value);
}

/**
 * Event handler when a type is selected.
 */
function typeSelected() {
    conversionChosen = conversionsAvailable[conversionTypeSelector.value];
    leftInputChanged();
}

/**
 * Conversions functions.
 */

/**
 * Choose the selected encoding.
 * @param {string} input
 */
function processEncoding(input) {
    return conversionChosen.encode(input);
}

/**
 * Choose the selected decoding.
 * @param {string} input 
 */
function processDecoding(input) {
    return conversionChosen.decode(input);
}
