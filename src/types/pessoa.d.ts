export interface Pessoa {
  id: number;
  foto?: File;
  nomeCompleto: string;
  dataNascimento: string; // Utilizando string no formato YYYY-MM-DD
  cpf: string;
  rg: string;
  genero: string;
  estadoCivil: string;
  telefoneCelular: string;
  telefoneResidencial?: string;
  email: string;
  endereco: Endereco;
  informacaoSeguranca: InformacaoSeguranca;
}
