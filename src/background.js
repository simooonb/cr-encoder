/**
 * Class used for diverse conversions.
 */
class ConversionUtility {
    constructor(encodeFunc, decodeFunc) {
        this.encode = encodeFunc;
        this.decode = decodeFunc;
    }
}

// Conversions available.
var conversionsAvailable = {
    "base64": new ConversionUtility(strToBase64, base64ToStr),
    "hex": new ConversionUtility(strToHex, hexToStr)
}

var conversionsKeys = Object.keys(conversionsAvailable);
var conversionChosen = conversionsAvailable[conversionsKeys[0]];

var contextMenuItemBaseId = "cr-converter-contextmenu-";

// Create Chrome context menu.
chrome.contextMenus.create({
    title: "Encode and copy selection as...",
    contexts: ["selection"],
    id: contextMenuItemBaseId + "parent",
});

conversionsKeys.forEach(function(conversion) {
    chrome.contextMenus.create({
        title: conversion,
        contexts: ["selection"],
        id: contextMenuItemBaseId + conversion,
        onclick: contextMenuCallback,
        parentId: contextMenuItemBaseId + "parent"
    });
});

/**
 * Copy to clipboard.
 */
function contextMenuCallback(info, tab) {
    // Create a fake input.
    var input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;

    // Set its value to the chosen encoded string.
    var contextMenuChosenConversion = replace(info.menuItemId, contextMenuItemBaseId, '');
    input.value = conversionsAvailable[contextMenuChosenConversion].encode(info.selectionText);

    // Append it to the body and copy its value.
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');

    // Remove it from the body.
    document.body.removeChild(input);
}

/**
 * Conversions functions.
 */

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

/**
 * Utilities functions.
 */

function replace(base, search, replacement) {
    return base.split(search).join(replacement);
}
