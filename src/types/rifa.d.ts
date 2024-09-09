import { Document } from "./document";

export interface Rifa {
    id?:number;
    description: string;
    title: string;
    quotaPrice: number;
    image: Document[];
    cotas: Cota[];
}