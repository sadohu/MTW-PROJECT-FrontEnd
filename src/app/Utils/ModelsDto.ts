export class ClientDocument {
    idDocumentType?: number;
    description?: string;
    apiDescription?: string;
}

export const listClientDocument: ClientDocument[] = [
    { idDocumentType: 1, description: 'DNI', apiDescription: 'dni' },
    { idDocumentType: 2, description: 'RUC', apiDescription: 'ruc' },
]
