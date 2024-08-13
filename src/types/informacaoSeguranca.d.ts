export interface InformacaoSeguranca {
  id: number;
  codigoAcesso: string;
  tipoPessoa: TiposPessoa;
  dataEntrada: string; // Utilizando string no formato YYYY-MM-DD
  dataSaida?: string; // Utilizando string no formato YYYY-MM-DD
  placaVeiculo?: string;
  autorizacaoEntradaVisitantes: boolean;
  nomeContatoEmergencia?: string;
  relacaoContatoEmergencia?: string;
  telefoneContatoEmergencia?: string;
}
