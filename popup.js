/* popup codigo qr */
chrome.tabs.getSelected(null,function(tab) {
    var url = tab.url;
	montaurl="http://chart.apis.google.com/chart?chs=250x250&cht=qr&chl=" + encodeURIComponent(url);
	/* titulo do popup em i18n */
	document.getElementById("appTitle").innerHTML = chrome.i18n.getMessage("appName");
	document.getElementById("appMessage").innerHTML = chrome.i18n.getMessage("notifTxt");
	document.getElementById("appOptionsLnk").innerHTML = chrome.i18n.getMessage("optionsTxt");
	
	/* imagem codigo qr */
	document.getElementById("qr").src = montaurl;
	
	/* link para options page */
	var link = document.getElementById('appOptionsLnk');
	link.addEventListener('click', function() {
        chrome.tabs.create({
			url: "history.html"
		})
    });
	
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
});