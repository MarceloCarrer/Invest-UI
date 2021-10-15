import { Mes } from './Mes';

export class Investimento {
  investimentoId: number;
  valor: number;
  dia: number;
  ano: number;
  mesId: number;
  mes: Mes;
  usuarioId: string;
}
