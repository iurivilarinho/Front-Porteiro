import { boolean } from "zod";
import { Document } from "./document";

export interface Rifa {
  id?: number;
  description: string;
  title: string;
  descriptionAward: string;
  quotaPrice: number;
  images: Document[];
  showQuotas: boolean;
  cotas: Cota[];
}
