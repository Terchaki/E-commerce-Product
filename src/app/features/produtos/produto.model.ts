export interface IProduto {
  id?: string;
  codigo: string;
  descricao: string;
  departamentoCodigo: string;
  preco: number;
  status: boolean;
}

export interface IDepartamento {
  codigo: string;
  descricao: string;
}
