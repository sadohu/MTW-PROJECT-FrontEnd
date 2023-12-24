export class AppSettings {
    public static API_ENDPOINT = 'http://localhost:9090';
    public static AUTH_SERVICE = AppSettings.API_ENDPOINT + '/auth';
    public static COMPANY_SERVICE = AppSettings.API_ENDPOINT + '/company';

    public static API_APIPERU = 'https://dniruc.apisperu.com/api/v1';
    public static API_APIPERU_RUC = AppSettings.API_APIPERU + '/ruc';
    public static API_APIPERU_DNI = AppSettings.API_APIPERU + '/dni';
}