// Firefox doesn't allow custom message to be shown in the beforeunload event
// Blockage allows the user to show a message while the standard unload navigation system is on screen
// Blockage expects functions to either return text to display, or false if they don't want to block the page unload event

var blockage = (function() {
	
	var checks = Array();
	var navigvationBlocked = false;
	
	this.addCheck = function(newCheck){
		checks.push(newCheck);
		
		this.blockNavigation(true);
		
		return true;
	}
	
	this.blockNavigation = function (blocked) {
		navigationBlocked = blocked;
		
		if (this.navigationBlocked){
			var that = this;
			window.onbeforeunload = function(e){
				return that.checkNavigationOK();
			}
		}else {
			window.onbeforeunload = null;
			checks = Array();
		}
		
		return true;
	}
	
	this.checkNavigationOK = function () {
		if (navigationBlocked){
			
			if (typeof(this.message) == 'undefined') this.message = new messageDisplay();
			
			for (var i = 0; i <= (checks.length - 1); i++){
				var textMessage = checks[i]();
				
				if (textMessage !== false){
					this.message.setMessage(textMessage);
					return textMessage;
				}
				
			}
		}
		
		return;
	}
	
	messageDisplay = function(){
		this.messageTxArea		= false;
		this.userMessage 		= false;
		this.messageContainer 	= false;
		this.displayed			= false;
		var loaded 				= false;
		
		this.setMessage = function(userMessage){
			if (!loaded) this.load();
			
			this.userMessage = userMessage;
			
			this.display();
		}
		
		this.display = function(){
			this.messageTxArea.innerHTML = this.userMessage;
			this.messageContainer.style.display = 'block';
			this.displayed = true;
		}
		
		this.hide = function() {
			this.messageContainer.style.display = 'none';
			this.displayed = false;
		}
		
		this.load = function() {
			this.messageContainer = document.createElement('div');
			this.messageContainer.style['background-color'] = 'red';
			this.messageContainer.style.height 		= this.messageContainer.style.width = '100%';
			this.messageContainer.style.top 		= this.messageContainer.style.left = '0';
			this.messageContainer.style.position 	= 'fixed';
			this.messageContainer.style.zIndex 		= 999999999;
			this.messageContainer.id 				= 'messageConainter';
			
			this.messageTxArea = document.createElement('div');
			this.messageTxArea.style.fontSize 	= '28px';
			this.messageTxArea.style.color 		= 'white';
			this.messageTxArea.style.position 	= 'absolute';
			this.messageTxArea.style.textAlign 	= 'center';
			this.messageTxArea.style.width 		= '100%';
			this.messageTxArea.style.top			= '80%';
			
			this.messageContainer.appendChild(this.messageTxArea);
					
			var parentObj = document.querySelector('body');
			parentObj.insertBefore(this.messageContainer,parentObj.firstChild);
			
			var that = this;
			window.addEventListener('focus',function(){
				that.checkMessageDisplaying();
			},false);
			
			loaded = true;
		}
		
		this.checkMessageDisplaying = function() {
			if (this.displayed) {
				this.hide();	
			}	
		}
		
		return this;
	};
	
	return this;
})();

