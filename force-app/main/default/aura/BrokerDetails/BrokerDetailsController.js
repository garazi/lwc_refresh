({
	editRecord: function(component, event, helper) {
		helper.showHide(component);
	},
	fireToast: function(component,event,helper) {
		var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"title": "Success!",
			"message": "The broker's info has been updated.",
			"type": "success"
		});
		toastEvent.fire();
		helper.showHide(component);
	},
	handleCancel : function (component, event, helper) {
		console.log("foo: ", component.find("editForm").get("v.recordId"))
		var recId = component.get("v.recordId")
		var theForm = component.find("editForm").set("v.recordId", "")
		console.log("foo2: ", component.find("editForm").get("v.recordId"))
		// helper.showHide(component)
		event.preventDefault();
	},
	foo : function(component,event,helper) {
		component.find("brokerRecord").set("v.recordId", component.get("v.recordId") )
		console.log("it fired")
	},
	doInit : function(component,event,helper) {
		console.log("init")
		// component.find("brokerRecord").set("v.recordId", "a00R000000EtuFDIAZ" )
	}
})