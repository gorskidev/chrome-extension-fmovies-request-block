// Consts
AVAILABLE_URLS = [
    "://*.fmovies.*/",
    "//*.cavjg.mcloud*/"
]

// Functions
// Web Requests
const isUrlAuthorized = (url) => {
    return AVAILABLE_URLS.indexOf(url) !== -1
}

// chrome
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
        return { cancel: isUrlAuthorized(details.url)}
    }, 
    { urls: ['<all_urls>'] }, 
    ["blocking"])


// Delete player's scripts 

// chrome.tabs.onActivated.addListener((event) => {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {code: "document.body.style.backgroundColor = 'red'"});
//       });
// })