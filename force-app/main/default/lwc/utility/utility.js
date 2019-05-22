function sentenceCase(str){
    return str.replace(/[a-z]/i, function (letter) {
        return letter.toUpperCase();
    }).trim();
}

function CelsiusToFahrenheit(celsius) {
    let temp = ( (celsius * 1.8) + 32 ).toFixed(2);
    return temp;
}

function FahrenheitToCelsius(fahrenheit){
    // fahrenheit
    let temp = ( (fahrenheit - 32) * 1.8).toFixed(1);
    return temp;
}

export { sentenceCase, CelsiusToFahrenheit, FahrenheitToCelsius }