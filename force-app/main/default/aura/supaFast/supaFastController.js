({

	handleFocus: function(component, event, helper) {
		alert("focused!");
		console.log('Helloooooooooo');
    },
    handleStepBlur : function (cmp, evt, helper) {
        var stepIndex = evt.getParam('index');
        alert("f: ", stepIndex)
    },
    submit : function(component, event, helper) {
		alert('submit triggered');
	}
})