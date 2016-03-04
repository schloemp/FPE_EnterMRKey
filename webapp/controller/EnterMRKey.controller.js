sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("EnterMRKey.controller.EnterMRKey", {
		selectedKey: undefined,
		PEStepContainer: undefined,
		onInit: function() {
			if (sap.ushell && sap.ushell.services.ProcessEngine) {
				var lPE = sap.ushell.Container.getService("ProcessEngine");
				this.PEStepContainer = lPE.getCurrentStepContainer();
				if (this.PEStepContainer) {
					var lModel = new JSONModel({
						CustomerName: this.PEStepContainer.CustomerName,
						CustomerAddress: this.PEStepContainer.CustomerAddress
					});
					this.getView().setModel(lModel, "data");
				}
			} else {
				this.PEStepContainer = {};
			}
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
				this.PEStepContainer.MROrderDate = aEvent.getParameter("listItem").getInfo();
				this.PEStepContainer.MROrderType = aEvent.getParameter("listItem").getDescription();
				this.PEStepContainer.Premise = "7805678";
				this.PEStepContainer.Installation = "8064434";
			} else {
				this.PEStepContainer.MROrderKey = undefined;
				this.PEStepContainer.MROrderDate = undefined;
				this.PEStepContainer.MROrderType = undefined;
				this.PEStepContainer.Premise = undefined;
				this.PEStepContainer.Installation = undefined;
			}
		}
	});
});