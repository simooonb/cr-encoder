/**
 * Class used for diverse conversions.
 */
class ConversionUtility {
    constructor(encode, decode) {
        this.encodeFunc = encode;
        this.decodeFunc = decode;
    }

    decode(input) {
        return this.decodeFunc(input);
    }

    encode(input) {
        return this.encodeFunc(input);
    }
}

// Conversions available.
var conversionsAvailable = {
    "base64": new ConversionUtility(strToBase64, base64ToStr),
    "hex": new ConversionUtility(strToHex, hexToStr)
}

var conversionsKeys = Object.keys(conversionsAvailable);
var conversionChosen = conversionsAvailable[conversionsKeys[0]];

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

/**
 * Encode a string to base64.
 * @param {string} input
 */
function strToBase64(input) {
    try {
        return window.btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
        return "";
    }
}

/**
 * Decode a base64 string.
 * @param {string} input 
 */
function base64ToStr(input) {
    try {
        return decodeURIComponent(escape(window.atob(input)));
    } catch (e) {
        return "";
    }
}

/**
 * Encode a utf-8 string to hexadecimal.
 * @param {string} input 
 */
function strToHex(input) {
    var hex, result = "";

    for (var i = 0; i < input.length; i++) {
        hex = input.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result;
}

/**
 * Decode a hexadecimal to a string.
 * @param {string} input 
 */
function hexToStr(input) {
    var hexes = input.match(/.{1,4}/g) || [];
    var result = "";

    for (var i = 0; i < hexes.length; i++) {
        result += String.fromCharCode(parseInt(hexes[i], 16));
    }

    return result;
}
