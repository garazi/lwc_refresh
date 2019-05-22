import { LightningElement, api, track, wire } from 'lwc';
import { sentenceCase, CelsiusToFahrenheit, FahrenheitToCelsius } from 'c/utility';
import { getRecord } from 'lightning/uiRecordApi';
import getWeather from '@salesforce/apex/weatherService.weatherService';

const weatherTypeMap = {clear:"🌞",rain:"🌧️",clouds:"☁️",thunderstorms:"🌩️",tornado:"🌪️"}
const DEFAULT_WEATHER = "rain";
const CELSIUS = "Celsius";
const FAHRENHEIT = "Fahrenheit";

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

export default class Weather extends LightningElement {
    @api recordId;
    @track _weatherState = DEFAULT_WEATHER;
    @api temperature;
    @api input = CELSIUS;
    @track property;
    @track cardTitle;
    @track address;
    @track zoomLevel = "18";
    @api mapMarkers = [];
    @track currentConditions;
    @track showWeather;

    @api 
    set weatherState(value){
        // Check to see that this weather type exists
        if (weatherTypeMap.hasOwnProperty(value)) {
            this._weatherState = value;
        } else {
            // Couldn't find weather state, use default
            this._weatherState = DEFAULT_WEATHER;
        }
    }

    @wire(getWeather, {city: 'London', unit: 'metric'})
    currentWeather(value) {
        if(value.data){
            this.currentConditions = JSON.parse(value.data);
            this.temperature = this.currentConditions.main.temp;
            let cWeather = this.currentConditions.weather[0].main;
            cWeather.toLowerCase();
            this._weatherState = weather-state;
            console.log("CURRENT: ", this.currentConditions)
            console.log("WEATHER: ", this.currentConditions.weather[0].main)
        } else {
            console.log("ERROR: ", value.error)
        }
    }
 
    @wire(getRecord, { recordId: '$recordId', fields })
    wiredProperty(value) {
        if (value.data) {
            this.zoomLevel = "12";
            this.property = value.data;
            this.address = this.property.fields.Address__c.value + ', ' + this.property.fields.City__c.value + ', ' + this.property.fields.State__c.value;
            this.cardTitle = this.property.fields.Name.value;
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

    get weatherState() {
        return sentenceCase(this._weatherState);
    }

    get weatherIcon(){
        const descriptor = Object.getOwnPropertyDescriptor(weatherTypeMap, this._weatherState);
        return descriptor.value;
    }

    get weatherTemperature(){
        if(this.input === CELSIUS) {
            return `${this.temperature}° C`
        } 
        return `${this.temperature}° F`
    }

    get weatherTemperatureConversion(){
        if(this.input === CELSIUS) {
            let convert = CelsiusToFahrenheit(this.temperature);
            return `${convert}° F`
        } 
        let convert = FahrenheitToCelsius(this.temperature);
        return `${convert}° C`
    }

    handleToggle(event) {
        this.showWeather = event.target.checked;
        console.log("TOGGLE: ", event.target.checked)
    }
}