import { LightningElement, api, track, wire } from 'lwc';
import { sentenceCase, CelsiusToFahrenheit, FahrenheitToCelsius } from 'c/utility';
import { getRecord } from 'lightning/uiRecordApi';
import getWeather from '@salesforce/apex/weatherService.weatherService';

const weatherTypeMap = {Clear:"🌞",Rain:"🌧️",Clouds:"☁️",Thunderstorms:"🌩️",tornado:"🌪️"}
const DEFAULT_WEATHER = "Clear";
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
    @track weatherState = DEFAULT_WEATHER;
    @api temperature;
    @api input = CELSIUS;
    @track property;
    @track currentConditions;
    @api city;

    @wire(getWeather, {city: '$city', unit: 'metric'})
    currentWeather(value) {
        if(value.data){
            this.currentConditions = JSON.parse(value.data);
            console.log("WEATHER:", this.currentConditions)
            this.temperature = this.currentConditions.main.temp;
            let cWeather = this.currentConditions.weather[0].main;
            this.weatherState = cWeather;
        } else {
            console.log("ERROR: ", value.error)
        }
    }

    get weatherIcon(){
        const descriptor = Object.getOwnPropertyDescriptor(weatherTypeMap, this.weatherState);
        if (descriptor) {
            return descriptor.value;
        }
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
}