"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Receita } from "../components/Interfaces";

export default function ReceitaDetalhada() {
  const [receita, setReceita] = useState<Receita | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchReceita = async () => {
      if (!id) return;

      try {
        const response = await fetch(`https://67438360b7464b1c2a650ba6.mockapi.io/api/v1/receitas/${id}`);
        const data: Receita = await response.json();
        setReceita(data);
      } catch (error) {
        console.error("Erro ao buscar receita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceita();
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!receita) {
    return <div>Receita não encontrada.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{receita.titulo}</h1>
      <p><strong>Tipo de Refeição:</strong> {receita.tipoRefeicao}</p>
      <p><strong>Dificuldade:</strong> {receita.dificuldade}</p>
      <p><strong>Serve:</strong> {receita.serve} pessoas</p>

      <div>
        <strong>Ingredientes:</strong>
        <ul className="list-disc pl-5">
          {receita.ingredientes.map((ingrediente, index) => (
            <li key={index}>{ingrediente}</li>  
          ))}
        </ul>
      </div>

      <div>
        <strong>Passos:</strong>
        <ol className="list-decimal pl-5">
          {receita.passos.map((passo, index) => (
            <li key={index}>{passo}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
