chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
        {
            conditions: [new chrome.declarativeContent.PageStateMatcher(
                {
                    pageUrl: {
                        urlMatches: 'fmovies'
                    },
                }
            )],
            actions: [
                new chrome.declarativeContent.ShowPageAction()
            ]
        }
    ]);
});

chrome.webRequest.onBeforeRequest
    .addListener(details => { 
        console.log(details) 
        return { cancel: details.url.indexOf("://*.fmovies.*/") != -1 } 
    }, 
    { urls: ['<all_urls>'] }, 
    ["blocking"])