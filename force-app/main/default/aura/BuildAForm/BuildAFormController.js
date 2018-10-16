({
    doInit : function (cmp, evt, hpl) {
        var str = cmp.get("v.fieldsToDisplay").replace(/\s+/g,'');        
        var array = str.split(",");
        cmp.set("v.fieldsArray", array)     
    }
})