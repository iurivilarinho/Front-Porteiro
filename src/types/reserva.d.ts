import { Pessoa } from "./pessoa";

interface Reservation {
  id?: number;
  rifaId: number;
  quotasId: number[];
  userPurchase: Pessoa;
}
