import { Document } from "mongoose";

export class Oleo extends Document {
  id: number;
  nome: string;
  descricao: string;
  comoUsar: string;
  habilitado: boolean;
}
