"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import FormularioReceita from "./components/FormularioReceita";
import { Receita } from "./components/Interfaces";

export default function Home() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await fetch("https://67438360b7464b1c2a650ba6.mockapi.io/api/v1/receitas");
        const data: Receita[] = await response.json();
        setReceitas(data);
        console.log(data)
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  const adicionarReceita = async (novaReceita: Receita) => {
    try {
      const response = await fetch("https://67438360b7464b1c2a650ba6.mockapi.io/api/v1/receitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaReceita),
      });
      const receitaAdicionada = await response.json();
      setReceitas([...receitas, receitaAdicionada]);
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
    }
  };

  const editarReceita = async (id: string, receitaAtualizada: Receita) => {
    try {
      const response = await fetch(`https://67438360b7464b1c2a650ba6.mockapi.io/api/v1/receitas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receitaAtualizada),
      });
      const receitaEditada = await response.json();
      setReceitas(receitas.map((r) => (r.id === id ? receitaEditada : r)));
      setReceitaSelecionada(null);
    } catch (error) {
      console.error("Erro ao editar receita:", error);
    }
  };

  const excluirReceita = async (id: string) => {
    try {
      await fetch(`https://67438360b7464b1c2a650ba6.mockapi.io/api/v1/receitas/${id}`, {
        method: "DELETE",
      });
      setReceitas(receitas.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Receitas</h1>
      <FormularioReceita
        onSubmit={adicionarReceita}
        receitaAtual={receitaSelecionada}
        onEdit={editarReceita}
        onCancel={() => setReceitaSelecionada(null)}
      />
      <ul className="space-y-4">
        {receitas.map((receita) => (
          <li key={receita.id}>
            <Link href={`/${receita.id}`} className="text-blue-500 underline">
              {receita.titulo}
            </Link>
            <div>
              <button onClick={() => setReceitaSelecionada(receita)} className="mr-2 text-green-500">Editar</button>
              <button onClick={() => excluirReceita(receita.id)} className="text-red-500">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
