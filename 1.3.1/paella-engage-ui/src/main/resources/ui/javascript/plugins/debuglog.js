paella.plugins.DebugLog = Class.create(paella.EventDrivenPlugin,{
	enabled:false,
	startTimestamp:0,
	endTimestamp:0,

	getEvents:function() {
		return [paella.events.loadStarted,paella.events.loadComplete];
	},
	
	onEvent:function(eventType,params) {
		switch (eventType) {
			case paella.events.loadStarted:
				this.loadStarted();
				break;
			case paella.events.loadComplete:
				this.loadComplete();
				break;
			case paella.events.play:
				this.play();
				break;
			case paella.events.pause:
				this.pause();
				break;
		}
	},
	
	loadStarted:function() {
		this.startTimestamp = new Date().getTime();
		var userAgent = new UserAgent();
		console.log("load started");

		console.log("Operating system: " + userAgent.system.OSName + " " + userAgent.system.Version.stringValue);		
		console.log("Browser: " + userAgent.browser.Name + " " + userAgent.browser.Version.versionString);
	},

	loadComplete:function() {
		this.endTimestamp = new Date().getTime();
		var userAgent = new UserAgent();
		var loadTime = (this.endTimestamp - this.startTimestamp)/1000;
		console.log("load complete. Total loading time: " + loadTime + " seconds");
		var os = userAgent.system.OSName;
		var osVersion = userAgent.system.Version.stringValue;
		var browser = userAgent.browser.Name;
		var browserVersion = userAgent.browser.Version.versionString;
		new Ajax.Request("save_user_data.php",{
			method:'GET',
			parameters:{os:os,osVersion:osVersion,browser:browser,browserVersion:browserVersion,loadTime:loadTime},
			onSuccess:function(transport) {
				
			}
		});
	}
});

new paella.plugins.DebugLog();