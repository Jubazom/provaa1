import { useState, useEffect } from "react";
import { Tarefa } from "../../Models/tarefas";
import axios from "axios";

function ListarTarefasConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      setCarregando(true);
      const resposta = await axios.get(
        "http://localhost:5000/api/tarefas/concluidas"
      );
      setTarefas(resposta.data);
      setErro("");
    } catch (error: any) {
      console.log(error);
      setErro("Erro ao carregar tarefas!");
      setTarefas([]);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return <div>Carregando tarefas...</div>;
  }

  return (
    <div>
      <h1>Tarefas Concluídas</h1>
      {erro && <p>{erro}</p>}

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa concluída encontrada</p>
      ) : (
        <table border={1}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.tarefaId}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarTarefasConcluidas;
