import { LightningElement, api, track, wire } from 'lwc';

export default class helloWorld extends LightningElement {
    @api recordId;
    @api objectApiName;
}
