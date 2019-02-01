import { LightningElement, api, track, wire } from 'lwc';

export default class helloWorld extends LightningElement {
    @track greeting = "World";
    @track title = "My LWC Card";

    changeHandler(evt) {
        this.greeting = evt.target.value;
    }
}
