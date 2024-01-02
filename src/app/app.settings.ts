export class AppSettings {
    public static API_ENDPOINT = 'http://localhost:9090';
    public static AUTH_SERVICE = AppSettings.API_ENDPOINT + '/auth';
    public static COMPANY_SERVICE = AppSettings.API_ENDPOINT + '/company';
    public static DRIVER_SERVICE = AppSettings.API_ENDPOINT + '/driver';
    public static UBIGEO_SERVICE = AppSettings.API_ENDPOINT + '/ubigeo';
    public static CURRENCY_SERVICE = AppSettings.API_ENDPOINT + '/currency';
    public static AREA_SERVICE = AppSettings.API_ENDPOINT + '/areas';

    public static API_APIPERU = 'https://dniruc.apisperu.com/api/v1';
    public static API_APIPERU_RUC = AppSettings.API_APIPERU + '/ruc';
    public static API_APIPERU_DNI = AppSettings.API_APIPERU + '/dni';

}