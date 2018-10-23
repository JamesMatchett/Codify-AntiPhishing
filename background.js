

'use strict';


chrome.runtime.onInstalled.addListener(function () {

    chrome.storage.sync.set({ 'number': 1 }, function () { });
    setIcon(2);

});

function setIcon(Innumber) {
var nax;
if(Innumber == 1){
 nax = 2;} else{
nax = 1;}
    chrome.storage.sync.set({ number: nax }, function () { });
    chrome.browserAction.setIcon({ path: 'icon' + Innumber + '.png' });
}

function updateIcon() {
  chrome.storage.sync.get('number', function(data) {
    var current = data.number;
    chrome.browserAction.setIcon({path: 'icon' + current + '.png'});
    current++;
    if (current > 2) {
        ParseUrl();
        current = 1;
    }
    chrome.storage.sync.set({number: current}, function() {
      console.log('The number is set to ' + current);
    });
  });
};

chrome.browserAction.onClicked.addListener(updateIcon);


function Addlisten() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete' && tab.active) {
            chrome.storage.sync.get('number', function (data) {

                var current = data.number;
                if (current == 1) {
                   
                    ParseUrl();
                } else {
                    

                }
                

            });
        }
    });
}
Addlisten();


function ParseUrl() {
    
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        // and use that tab to fill in out title and url
        var tab = tabs[0];
       

        if (tab.url.includes("xn--", 0)) {
            alert("URL includes PUNYcode style address, Be careful it is the right Webpage! "+ tab.url);
        }

        var upto; 
        var slashcount = 0;
        for (x = 0; x < tab.url.length; x++){
            if(tab.charAt(x) == "/"){
            slashcount = slashcount +1;
            }
            if(slashcount == 3){
                upto =x;
                x=tab.url.length;
            }
        }
        var x = 0;
        for (x = 0; x < upto; x++){
            if(tab.url.charCodeAt(x) > 127){
                alert("URL contains non-alphabetic character "+tab.charAt(x) + " Be careful it is the right Webpage!");
            }

        for(x = 0; x<upto;x++){
            if(tab.url.charAt(x)== "%"){
                //if 0123456789ABCDEFG
                if((tab.url.charCodeAt(x+1) >= 48 && tab.url.charCodeAt(x+1) <= 57) || tab.url.charCodeAt(x+1) >= 65 && tab.url.charCodeAt(x+1) <= 70){
                    if((tab.url.charCodeAt(x+1) >= 48 && tab.url.charCodeAt(x+1) <= 57) || tab.url.charCodeAt(x+1) >= 65 && tab.url.charCodeAt(x+1) <= 70){
                         
                    var HexString = (tab.url.charAt(x+1) + tab.url.charAt(x+2));
                    var DecNumber = parseInt(HexString, 16);
                    
                    if(DecNumber > 127){
                        
                        var ActualChar;
                        ActualChar =  String.fromCharCode(DecNumber);
                        
                        alert("URL contains non-alphabetic character sequence '"+ ActualChar + "' Be careful it is the right Webpage!");
                        x=tab.url.length;
                    }
                    }
                }
               
            }
        }
        }
    });
}
