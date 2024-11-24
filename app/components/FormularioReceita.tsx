import { useState, useEffect } from "react";
import { Receita } from "./Interfaces";

interface FormularioReceitaProps {
  onSubmit: (novaReceita: Receita) => void;
  receitaAtual?: Receita | null;
  onEdit?: (id: string, receitaAtualizada: Receita) => void;
  onCancel?: () => void;
}

export default function FormularioReceita({
  onSubmit,
  receitaAtual,
  onEdit,
  onCancel,
}: FormularioReceitaProps) {
  const [receita, setReceita] = useState<Receita>({
    id: "",
    titulo: "",
    tipoRefeicao: "",
    serve: 1,
    dificuldade: "",
    ingredientes: [],
    passos: [],
  });

  const [ingredientesTexto, setIngredientesTexto] = useState<string>("");
  const [passosTexto, setPassosTexto] = useState<string>("");

  useEffect(() => {
    if (receitaAtual) {
      setReceita(receitaAtual);
      setIngredientesTexto(receitaAtual.ingredientes.join(","));
      setPassosTexto(receitaAtual.passos.join(","));
    } else {
      setReceita({
        id: "",
        titulo: "",
        tipoRefeicao: "",
        serve: 1,
        dificuldade: "",
        ingredientes: [],
        passos: [],
      });
      setIngredientesTexto("");
      setPassosTexto("");
    }
  }, [receitaAtual]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReceita({ ...receita, [e.target.name]: e.target.value });
  };

  const handleIngredientesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientesTexto(e.target.value);
  };

  const handlePassosChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPassosTexto(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const ingredientesArray = ingredientesTexto.split(",").map((item) => item.trim());
    const passosArray = passosTexto.split(",").map((item) => item.trim());
  
    const novaReceita = {
      ...receita,
      ingredientes: ingredientesArray,
      passos: passosArray,
    };
  
    if (receitaAtual) {
      onEdit?.(receita.id, novaReceita);
    } else {
      onSubmit({ ...novaReceita, id: Math.random().toString(36).substring(7) });
    }
  
    setReceita({
      id: "",
      titulo: "",
      tipoRefeicao: "",
      serve: 1,
      dificuldade: "",
      ingredientes: [],
      passos: [],
    });
    setIngredientesTexto("");
    setPassosTexto("");
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md">
      {/* Título */}
      <div className="mb-4">
        <label className="block font-medium">Título da Receita</label>
        <input
          type="text"
          name="titulo"
          value={receita.titulo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Digite o título da receita"
          required
        />
      </div>

      {/* Tipo de Refeição */}
      <div className="mb-4">
        <label className="block font-medium">Tipo de Refeição</label>
        <select
          name="tipoRefeicao"
          value={receita.tipoRefeicao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione o tipo de refeição</option>
          <option value="Café da Manhã">Café da Manhã</option>
          <option value="Almoço">Almoço</option>
          <option value="Jantar">Jantar</option>
          <option value="Lanche">Lanche</option>
        </select>
      </div>

      {/* Serve */}
      <div className="mb-4">
        <label className="block font-medium">Serve</label>
        <input
          type="number"
          name="serve"
          value={receita.serve}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>

      {/* Dificuldade */}
      <div className="mb-4">
        <label className="block font-medium">Dificuldade</label>
        <select
          name="dificuldade"
          value={receita.dificuldade}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione a dificuldade</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
      </div>

      {/* Ingredientes */}
      <div className="mb-4">
        <label className="block font-medium">Ingredientes (separe por vírgulas)</label>
        <textarea
          value={ingredientesTexto}
          onChange={handleIngredientesChange}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Exemplo: Banana 2 unidades, Ovo 1 unidade, Aveia 3 colheres"
          required
        ></textarea>
      </div>

      {/* Passos */}
      <div className="mb-4">
        <label className="block font-medium">Passos (separe por vírgulas)</label>
        <textarea
          value={passosTexto}
          onChange={handlePassosChange}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Exemplo: Amasse as bananas..., Adicione o ovo..., Aqueça a frigideira..."
          required
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {receitaAtual ? "Salvar Alterações" : "Adicionar Receita"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
