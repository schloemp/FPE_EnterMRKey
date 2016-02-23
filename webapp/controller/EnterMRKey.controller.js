sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("EnterMRKey.controller.EnterMRKey", {
		selectedKey: undefined,
		PEStepContainer: undefined,
		onInit: function() {
			var lPE = sap.ushell.Container.getService("ProcessEngine");
			this.PEStepContainer = lPE.getCurrentStepContainer();
			var lModel = new JSONModel({
				CustomerName: this.PEStepContainer.CustomerName
			});
			this.getView().setModel(lModel, "data");
		},
		onSubmit: function() {
			if (this.selectedKey) {
				var lPE = sap.ushell.Container.getService("ProcessEngine");
				lPE.executeNext();
			}
		},
		/**
		 *@memberOf EnterMRKey.controller.EnterMRKey
		 */
		onSelectionChanged: function(aEvent) {
			if (aEvent.getParameter("selected")) {
				this.selectedKey = aEvent.getParameter("listItem").getTitle();
				this.PEStepContainer.MROrderKey = this.selectedKey;
			} else {
				this.PEStepContainer.MROrderKey = undefined;
			}
		}
	});
});