// Chrome context menu handler
chrome.contextMenus.create({
    title: "Copy encoded selection as...",
    contexts: ["selection"],
    id: "cr-converter-contextmenu-parent",
});

chrome.contextMenus.create({
    title: "base64",
    contexts: ["selection"],
    id: "cr-converter-contextmenu-base64",
    onclick: contextMenuCallback,
    parentId: "cr-converter-contextmenu-parent"
});

function contextMenuCallback(info, tab) {
    console.log(info.selectionText);
}
