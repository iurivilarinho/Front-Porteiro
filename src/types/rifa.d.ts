import { Document } from "./document";

export interface Rifa {
    description: string;
    title: string;
    quotaPrice: number;
    image: Document[];
    cotas: Cota[];
}