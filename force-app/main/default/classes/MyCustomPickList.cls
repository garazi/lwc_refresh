global class MyCustomPickList extends VisualEditor.DynamicPickList{
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('Listed', 'Listed');
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {
        String obj = 'Property__c';
        String fld = 'Status__c';
        List<String> myList = getPickListValuesIntoList(obj,fld);
        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();

        for(String entry : myList) {
            VisualEditor.DataRow v = new VisualEditor.DataRow(entry, entry);
            myValues.addRow(v);
        }

        return myValues;
    }

    public List<String> getPickListValuesIntoList(String objectType, String selectedField){
        List<String> pickListValuesList = new List<String>();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        return pickListValuesList;
    }
}