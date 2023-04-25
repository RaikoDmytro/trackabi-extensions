const browserNames = {
	safari: 'safari',
	chrome: 'google chrome',
	'google-chrome': 'google chrome',
	'google chrome': 'google chrome',
	firefox: 'firefox',
	'microsoft-edge': 'microsoft edge',
	'microsoft edge': 'microsoft edge',
	'microsoft-edge-stable': 'microsoft edge',
	edge: 'edge',
	opera: 'opera',
	brave: 'brave browser',
	'brave browser': 'brave browser',
	'brave-browser': 'brave browser',
}

let browserName = null;

(() => {
	const browserBrands = navigator?.userAgentData?.brands
	if (browserBrands) {
		browserBrands.forEach(({ brand }) => {
			const brandLowerCase = brand.toLowerCase()
			if (browserNames[brandLowerCase]) {
				browserName = browserNames[brandLowerCase]
			}
		})
	}

	if (!browserName) {
		if (navigator.userAgent.toLowerCase().indexOf('firefox')) {
			browserName = 'firefox'
		}
	}
})()

function stringNotUrl(str) {
	const regExp = new RegExp(/^(https?|ftp|POP3|SMTP):\/\/.+$/);
	return !regExp.test(str);
}

const sendActivity = (requestData) => {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
		mode: 'no-cors'
	}

	fetch(
		`http://localhost:43325/${requestData}`,
		requestOptions)
		.then(() => {})
}

const switchUrl = (tab) => {
	if (tab.url && tab.url !== '' && stringNotUrl(tab.title)) {
		sendActivity(`
			?name=${encodeURIComponent(browserName)}
			&title=${encodeURIComponent(tab.title)}
			&url=${encodeURIComponent(tab.url)}
			`)
	}
}

// create function that will cat host from url address

const sendSingleActiveTabOfAllWindows = (ws) => {
	for (const window of ws) {
		if (window !== -1 && window.focused) {
			switchUrl(window.tabs.filter(({ active }) => active === true)[0])
		}
	}
}

const addListeners = () => {
	tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		switchUrl(tab)
	})

	tabs.onActivated.addListener(({ tabId }) => tabs.get(tabId, (tab) => switchUrl(tab)))

	windows.onFocusChanged.addListener(() => {
		windows.getAll({ populate: true }, (ws) => sendSingleActiveTabOfAllWindows(ws))
	})
}

setInterval(() => {
	windows.getAll({ populate: true }, (ws) => sendSingleActiveTabOfAllWindows(ws))
},1000)
runtime.onStartup.addListener(() => addListeners())
runtime.onInstalled.addListener(() => addListeners())

addListeners()

