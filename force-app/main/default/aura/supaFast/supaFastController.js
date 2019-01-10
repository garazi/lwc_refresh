({
	handleStep: function(component, event, helper) {
		var completedStep = component.get("v.completedStep");
		var currentStep = event.getSource().get("v.value");

		if (completedStep < currentStep) {
      console.log("ABORTING")
      var tmp = component.find("progressCmp");
      tmp.set("v.hasError", true);
		} else {
      var tmp = component.find("progressCmp");
      tmp.set("v.hasError", false);
			component.set("v.currentStep", currentStep);
			console.log("NOW: ", component.get("v.currentStep"))
		}
	},
	handleChange: function(component, event, helper) {
		var textarea = component.find("myTextarea");
		var textareaVal = event.getSource().get("v.value");
		component.set("v.currentChar", textareaVal.length);
		if(textareaVal.length == component.get("v.maxChar")) {
			 textarea.setCustomValidity("You have reached the maximum number of characters");
		}
		else {
			 textarea.setCustomValidity("");
		}
	}
})