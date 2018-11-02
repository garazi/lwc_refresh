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
	handleClick: function(component, event, helper) {
		var currentStep = event.getSource().get("v.value");
    component.set("v.completedStep", currentStep);
    var nextStep = parseInt(currentStep, 10) + 1
    nextStep = nextStep.toString();
    var tmp = component.find("progressCmp");
    tmp.set("v.hasError", false);
    component.set("v.currentStep", nextStep);
    console.log("new value: ", component.get("v.currentStep"))
	}
})