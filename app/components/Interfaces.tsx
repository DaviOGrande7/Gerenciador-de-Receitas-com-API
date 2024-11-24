export interface Receita {
    id: string;
    titulo: string;
    tipoRefeicao: string;
    serve: number;
    dificuldade: string;
    ingredientes: string[]; 
    passos: string[];
  }
  