import { Currency } from "./currency.model";

export class Bill {
    idBill?: number;
    series?: string;
    number?: string;
    date?: Date;
    subTotal?: number;
    igv?: number;
    total?: number;
    currency?: Currency;
}
