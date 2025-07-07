export interface IProduct {
  id?: string;
  codigo: string;
  descricao: string;
  departamentoCodigo: string;
  preco: number;
  status: boolean;
}

export interface IDepartment {
  codigo: string;
  descricao: string;
}
