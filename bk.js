chrome.runtime.onMessage.addListener(
    function (request, sender) {
        switch (request.action) {
            case "newPage":
                chrome.tabs.create({ url: request.url, active: false });
                break;
            case "closePage":
                chrome.tabs.remove(sender.tab.id);
                break;
        }
    }
);
