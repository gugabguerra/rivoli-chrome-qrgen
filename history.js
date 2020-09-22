/* titulo do popup em i18n */
document.getElementById("appTitle").innerHTML = chrome.i18n.getMessage("appName");
document.getElementById("historyTxt").innerHTML = chrome.i18n.getMessage("historyTxt");

/* recuperando historico */
chrome.storage.sync.get('qtd', function (obj) {
	if(obj.qtd === undefined) {
		par = document.createElement("p");
		par.innerHTML = chrome.i18n.getMessage("nenhumaUrl");
		document.getElementById("urls").appendChild(par);
	}
	else {
		/* montando botao limpa historico */
		pClear1 = document.getElementById("pClear1");
		pClear2 = document.getElementById("pClear2");
		aClear1 = document.createElement("a");
		aClear1.id = "lnkClear1";
		aClear1.href = "javascript:void(0);";
		aClear2 = document.createElement("a");
		aClear2.id = "lnkClear2";
		aClear2.href = "javascript:void(0);";
		aClear1.innerHTML = aClear2.innerHTML = "-- "+chrome.i18n.getMessage("btnLimpa")+" --";
		aClear1.onclick = aClear2.onclick = function limpaHist() {
			chrome.storage.sync.clear();
			location.reload();
		}
		pClear1.appendChild(aClear1);
		pClear2.appendChild(aClear2);
		/* fim montando botao limpa historico */
		
		var qtd = obj.qtd;
		chrome.storage.sync.get('urls', function (objUrl) {
			urlArray = objUrl.urls;
			urlArray.reverse();
			for(key in urlArray){
				lnk = document.createElement("a");
				lnk.href = urlArray[key];
				lnk.innerHTML = urlArray[key];
				par = document.createElement("p");
				indice = parseInt(key) + 1;
				par.innerHTML = indice+' - ';
				par.appendChild(lnk);
				document.getElementById("urls").appendChild(par);
			}
		});
	}
});