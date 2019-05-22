public with sharing class weatherService {
    @AuraEnabled(cacheable=true)
    public static String weatherService(String city, String unit) {
        String url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + unit + '&APPID=0a6a3ffc05360ffdb323a9fdfbd97e37';
        String resultList = getHttp(url);
        return resultList;
    }

    private static String getHttp (String url) {
        HttpRequest req = new HttpRequest();
        Http http = new Http();
        req.setMethod('GET');    
        req.setEndpoint(url);
        HTTPResponse res = http.send(req);
        return res.getBody();
    }
}
