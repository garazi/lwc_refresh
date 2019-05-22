import { LightningElement,track } from 'lwc';

export default class HelloTest extends LightningElement {
    @track showAddressLookup = true;

    handleChange (event) {
        if (event.detail.street.length > 0) {
            console.log("need to hide the lookup")
            this.showAddressLookup = false;
        } else {
            this.showAddressLookup = true;
        }
    }
}