export class AppSettings {
    /* API endpoints */
    public static API_ENDPOINT = 'http://localhost:9090';

    /* Auth endpoints */
    public static AUTH_SERVICE = AppSettings.API_ENDPOINT + '/auth';

    /* Utils endpoints */
    public static AREA_SERVICE = AppSettings.API_ENDPOINT + '/areas';
    public static CURRENCY_SERVICE = AppSettings.API_ENDPOINT + '/currency';
    public static UBIGEO_SERVICE = AppSettings.API_ENDPOINT + '/ubigeo';

    /* Main endpoints */
    public static COMPANY_SERVICE = AppSettings.API_ENDPOINT + '/company';
    public static DRIVER_SERVICE = AppSettings.API_ENDPOINT + '/driver';

    /* API Apiperu */
    public static API_APIPERU = 'https://dniruc.apisperu.com/api/v1';
    public static API_APIPERU_RUC = AppSettings.API_APIPERU + '/ruc';
    public static API_APIPERU_DNI = AppSettings.API_APIPERU + '/dni';

}