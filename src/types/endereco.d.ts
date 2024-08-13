export interface Endereco {
  id: number;
  unidade?: string;
  bloco?: string;
  vagaEstacionamento?: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}
