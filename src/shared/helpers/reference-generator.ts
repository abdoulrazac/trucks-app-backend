import { InvoiceNumber } from 'invoice-number'

import { REFERENCE_TYPE } from "../constants";


export function nextReference(refType: REFERENCE_TYPE, current: string | null) {
    const currentYearMonth = (new Date()).toISOString().slice(0, 7).replace('-', '/');

    if(refType == REFERENCE_TYPE.BREAKDOWN) {
        return current && currentYearMonth == current.slice(0, 7) ? InvoiceNumber.next(current) : currentYearMonth + '/BKD/0001';
    }
    if(refType == REFERENCE_TYPE.INVOICE) {
        return current && currentYearMonth == current.slice(0, 7) ? InvoiceNumber.next(current) : currentYearMonth + '/INV/0001';
    }
    if(refType == REFERENCE_TYPE.FINANCE) {
        return current && currentYearMonth == current.slice(0, 7) ? InvoiceNumber.next(current) : currentYearMonth + '/FIN/0001';
    }
    if(refType == REFERENCE_TYPE.CONTRACT) {
        return current && currentYearMonth == current.slice(0, 7) ? InvoiceNumber.next(current) : currentYearMonth + '/CTR/0001';
    }
    return null;
    
}