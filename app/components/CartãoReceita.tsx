import { Receita } from "./Interfaces";
import Link from "next/link";

interface CartaoReceitaProps {
  receita: Receita;
}

export default function CartaoReceita({ receita }: CartaoReceitaProps) {

  return (
    <div className="border p-4 rounded shadow-md">
        <h3 className="text-xl font-bold">{receita.titulo}</h3>
        <p><strong>Tipo de Refeição:</strong> {receita.tipoRefeicao}</p>
        <p><strong>Dificuldade:</strong> {receita.dificuldade}</p>
        <p><strong>Serve:</strong> {receita.serve} pessoas</p>

        <div>
            <strong>Ingredientes:</strong>
            <ul className="list-disc pl-5">
                {receita.ingredientes.map((ingrediente, index) => (
                <li key={index}>
                    {ingrediente}
                </li>
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

        <div className="mt-4 flex space-x-4">
        <Link href={`/editar/${receita.id}`} className="px-4 py-2 bg-blue-500 text-white rounded">Editar</Link>
        <Link href={`/detalhes/${receita.id}`} className="px-4 py-2 bg-green-500 text-white rounded">Ver Detalhes</Link>
        </div>
    </div>
  );
}
