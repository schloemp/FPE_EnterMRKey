sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("EnterMRKey.controller.EnterMRKey", {
		onSubmit: function() {
		    var lPE = sap.ushell.Container.getService("ProcessEngine");
		    lPE.executeNext();
		}
	});

});