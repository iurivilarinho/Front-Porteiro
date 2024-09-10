import { Document } from "./document";

export interface Rifa {
  id?: number;
  description: string;
  title: string;
  descriptionAward: string;
  quotaPrice: number;
  images: Document[];
  cotas: Cota[];
}
