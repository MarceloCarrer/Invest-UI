import { Ativo } from './Ativo';
import { Tipo } from './Tipo';
import { Mes } from './Mes';

export class Transacao {
  transacaoId: number;
  qtdCompra: number;
  valorCompra: number;
  diaCompra: number;
  mesIdCompra: number;
  anoCompra: number;

  qtdVenda: number;
  valorVenda: number;
  diaVenda: number;
  mesIdVenda: number;
  anoVenda: number;

  vendido: boolean;

  ativoId: number;
  ativo: Ativo;
  tipoId: number;
  tipo: Tipo;
  mes: Mes;
  usuarioId: string;
}
