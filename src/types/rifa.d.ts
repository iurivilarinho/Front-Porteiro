import { Document } from "./document";

export interface Rifa {
    description: string;
    title: string;
    image: Document;
    cotas: Cota[];
}