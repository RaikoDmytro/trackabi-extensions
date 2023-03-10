const config = {
	trackabiDesktopHost: 'http://localhost',
	trackabiDesktopPort: 43325
}

let lastTab = {
	url: "",
	title: ""
}

const getHostFromUrl = (url) => url.split("/")[2] || url

const sendActivity = (requestData) => {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
		mode: 'no-cors'
	}

	fetch(
		`${config.trackabiDesktopHost}:${config.trackabiDesktopPort}/${requestData}`,
		requestOptions)
		.then(() => {})
}

const switchUrl = (tab) => {
	if ((tab.url === lastTab.url) && (tab.title === lastTab.title)
		|| !tab.url || tab.url === '') {
		return
	}
	lastTab = tab
	sendActivity(`
		?url=${encodeURIComponent(tab.url)}
		&title=${encodeURIComponent(tab.title)}
		&browser=${browserName}
		&host=${encodeURIComponent(getHostFromUrl(tab.url))}
		`)
}

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
