({
	handleStep: function(component, event, helper) {
		event.preventDefault();

		// var completedStep = component.get("v.completedStep");
		// var currentStep = event.getSource().get("v.value");
        // if (currentStep == 1) {
        //     component.set("v.completedStep", '0');
        // }
		// if (completedStep < currentStep) {
		// 	console.log("ABORTING")
		// 	var tmp = component.find("progressCmp");
		// 	tmp.set("v.hasError", true);
		// } else {
		// 	var tmp = component.find("progressCmp");
		// 	tmp.set("v.hasError", false);
		// 	component.set("v.currentStep", currentStep);
        //     console.log("currentStep: ", component.get("v.currentStep"))
        //     if (currentStep == '4') {
        //         component.set("v.completedStep", '4')
        //     }
		// }
	},
	handleClick: function(component, event, helper) {
		var currentStep = event.getSource().get("v.value");
		component.set("v.completedStep", currentStep);
		var nextStep = parseInt(currentStep, 10) + 1
		nextStep = nextStep.toString();
		var tmp = component.find("progressCmp");
		tmp.set("v.hasError", false);
		component.set("v.currentStep", nextStep);
		console.log("currentStep: ", component.get("v.currentStep"))
	}
})