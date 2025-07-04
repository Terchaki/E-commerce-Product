export interface Produto {
  id?: string;
  codigo: string;
  descricao: string;
  departamentoCodigo: string;
  preco: number;
  status: boolean;
}

export interface Departamento {
  codigo: string;
  descricao: string;
}
