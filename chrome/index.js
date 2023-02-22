console.log('starting...');
let lastTab = {
	url: "",
	title: ""
}

const { tabs, runtime, windows } = chrome;
// function httpGet(theUrl) {
// 	let xmlHttp = null;
//
// 	xmlHttp = new XMLHttpRequest();
// 	xmlHttp.onload = function (e) {
// 		console.log('Send: '  + theUrl);
// 		console.log(xmlHttp.responseText)
// 	};
// 	xmlHttp.onerror = function (e) {
// 		console.log("Error fetching: " + theUrl);
// 	};
//
// 	xmlHttp.open("GET", theUrl, true);
// 	xmlHttp.send(null);
// }

const switchUrl = (tab) => {
	if (( tab.url === lastTab.url ) && ( tab.title === lastTab.title )) {
		return;
	}
	lastTab = tab;
	console.log("new url: " + encodeURI(tab.url) + " title: " + encodeURI(tab.title));
	// httpGet("http://localhost:55566/?appName="+encodeURI(appName)+"&url=" + encodeURI(tab.url) + "&title=" + encodeURI(tab.title));
}

const sendSingleActiveTabOfAllWindows = (ws) => {
	for (const window of ws) {
		if (window !== -1 && window.focused) {
			switchUrl(window.tabs.filter(({ active }) => active === true)[0]);
		}
	}
}

const addListeners = () => {
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status === 'complete') {
			chrome.tabs.get(tabId, tab => switchUrl(tab))
		}
	});

	chrome.tabs.onActivated.addListener(({ tabId }) => chrome.tabs.get(tabId, (tab) => switchUrl(tab)));

	windows.onFocusChanged.addListener(() => {
		windows.getAll({ populate: true }, (ws) => sendSingleActiveTabOfAllWindows(ws))
	});
}

setInterval(() => {
	windows.getAll({ populate: true }, (ws) => sendSingleActiveTabOfAllWindows(ws))
},1000);

chrome.runtime.onStartup.addListener(() => addListeners());

chrome.runtime.onInstalled.addListener(() => addListeners());

addListeners();
