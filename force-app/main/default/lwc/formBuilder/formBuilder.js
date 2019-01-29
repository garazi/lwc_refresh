import { LightningElement, api, track } from 'lwc';

export default class formBuilder extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    @api fieldsToDisplay = '';
    @api title;
    @api icon;
    @api mode;
    @api object;
    @api record;
    @api layout;
    @api columns;
    @track fields = [];

    connectedCallback() {  
    }

    renderedCallback() {
        if (!this.object) {
            return;
        }

        let form = this.template.querySelector('lightning-record-form');

        if (this.layout !== 'None') {
            form.layoutType = this.layout;
        }

        if (this.fieldsToDisplay !== '') {
            this.fields = this.fieldsToDisplay.split(",");
            form.fields = this.fields;
        }

    }
}
