import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getListByAddress from '@salesforce/apex/NeighborhoodServiceController.getListByAddress';

const fields = [
    'Property__c.Name',
    'Property__c.Address__c',
    'Property__c.City__c',
    'Property__c.State__c',
    'Property__c.Zip__c',
    'Property__c.Location__Longitude__s',
    'Property__c.Location__Latitude__s',
    'Property__c.Title__c'
]

export default class BusinessExplorer extends LightningElement {
    @api recordId;
    @track tabs = [{ label: 'Shopping', value: 'shopping' }, { label: 'Schools', value: 'schools' }, { label: 'Restaurants', value: 'restaurants' }];
    @track currentTab = this.tabs[0].value;
    @track property;
    @track address;
    @track searchResults;
    @track bizArray;
    @track rating;
    @track mapMarkers = [];
    @api flexipageRegionWidth;


    @wire(getRecord, { recordId: '$recordId', fields })
    wiredProperty(value) {
        if (value.data) {
            this.property = value.data;
            this.address = this.property.fields.Address__c.value + ',' + this.property.fields.City__c.value + ',' + this.property.fields.State__c;
            console.log("LOC: ", this.property.fields)
            this.mapMarkers = [{
                location: {
                    Street: this.property.fields.Address__c.value,
                    City: this.property.fields.City__c.value,
                    State: this.property.fields.State__c.value
                },
                title: this.property.fields.Title__c.value,
                description: this.address
            }];
            console.log("MARKERS: ", this.mapMarkers)
        } else if (value.error) {
            console.log("OOOPS: ", value.error)
        }
    }

    @wire(getListByAddress, { address: '$address', searchTerm: '$currentTab' })
    wiredResults(value) {
        if (value.data) {
            this.searchResults = value.data;
            this.bizArray = JSON.parse(this.searchResults).bizArray;
            this.bizArray.forEach(element => {
                element.rating = element.rating + " stars";
            });
            console.log("DATA: ", JSON.parse(this.searchResults));
            // this.createMapMarkers(this.bizArray);
        } else if (value.error) {
            console.log("ERROR: ", value.error);
        }
    }

    handleActive(evt) {
        this.currentTab = evt.target.value;
    }

    createMapMarkers(bizArray) {
        let tempArray = [];
        // bizArray.forEach(element => {
        //     let singleton = {
        // 		location: {
        // 			Longitude: element.location.longitude,
        // 			Latitude: element.location.latitude
        // 		},
        // 		title: element.name,
        // 		description: element.address + ', ' + element.city
        // 	}
        // 	tempArray.push(singleton);
        // });
        // this.mapMarkers = tempArray;
        // console.log("MAP: ", this.mapMarkers)
    }
}