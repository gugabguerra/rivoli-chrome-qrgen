/* menu de contexto - criando */
var root = chrome.contextMenus.create({
    title: 'Rivoli QR-Gen',
    contexts: ['link'],
	onclick: function (evt) {
		var url = evt.linkUrl
		var urlFinal = "http://chart.apis.google.com/chart?chs=250x250&cht=qr&chl=" + encodeURIComponent(url)
		/* chrome.tabs.create({ url: urlFinal }) */
		qrPopup(urlFinal);
		
		/* armazenando em historico */
		chrome.storage.sync.get('qtd', function (objQtd) {
			if(objQtd.qtd === undefined) {
				chrome.storage.sync.set({'qtd': 1});
				urlArray = [url];
				chrome.storage.sync.set({'urls':urlArray});
			}
			else {
				qtd = objQtd.qtd;
				
				chrome.storage.sync.get('urls', function (objUrl) {
					urlArray = objUrl.urls;
					if(objQtd.qtd == 20) { 
						urlArray.splice(0, 1);
					}
					else {
						chrome.storage.sync.set({'qtd': qtd+1}); 
					}
					urlArray.push(url);
					chrome.storage.sync.set({"urls":urlArray});
				});
			}
		});
		/* fim armazenando em historico */
	}
});

/* menu de contexto - qr aparece em um notification popup */
function qrPopup(urlFinal) {
	chrome.notifications.create(
		'Rivoli QR-Gen',
		{
			type: "image",
			title: chrome.i18n.getMessage("appName"),
			message: chrome.i18n.getMessage("notifTxt"),
			iconUrl: "icon_128.png",
			imageUrl: urlFinal
		}, 
		function() {} 
	)
};