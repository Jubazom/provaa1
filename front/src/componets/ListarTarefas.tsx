import { useState, useEffect } from "react";
import { Tarefa } from "../Models/tarefas";
import axios from "axios";

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState<"todas" | "naoconcluidas" | "concluidas">(
    "todas"
  );

  useEffect(() => {
    carregarTarefas();
  }, [filtro]);

  async function carregarTarefas() {
    try {
      setCarregando(true);
      let url = "http://localhost:5000/api/tarefas/listar";

      if (filtro === "naoconcluidas") {
        url = "http://localhost:5000/api/tarefas/naoconcluidas";
      } else if (filtro === "concluidas") {
        url = "http://localhost:5000/api/tarefas/concluidas";
      }

      const resposta = await axios.get(url);
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

  async function atualizarStatus(
    tarefaId: string | undefined,
    novoStatus: string
  ) {
    if (!tarefaId) return;

    try {
      const tarefa = tarefas.find((t) => t.tarefaId === tarefaId);
      if (!tarefa) return;

      const tarefaAtualizada: Tarefa = {
        ...tarefa,
        status: novoStatus,
      };

      await axios.put(
        `http://localhost:5000/api/tarefas/alterar/${tarefaId}`,
        tarefaAtualizada
      );

      carregarTarefas();
    } catch (error: any) {
      console.log(error);
      alert("Erro ao atualizar tarefa!");
    }
  }

  async function usarPatch(tarefaId: string | undefined) {
    if (!tarefaId) return;

    try {
      const tarefa = tarefas.find((t) => t.tarefaId === tarefaId);
      if (!tarefa) return;

      await axios.patch("http://localhost:5000/api/tarefa/alterar", {
        tarefaId: tarefaId,
      });

      carregarTarefas();
    } catch (error: any) {
      console.log(error);
      alert("Erro ao atualizar tarefa!");
    }
  }

  if (carregando) {
    return <div>Carregando tarefas...</div>;
  }

  return (
    <div>
      <h1>Listar Tarefas</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <div>
        <button
          onClick={() => setFiltro("todas")}
          style={{
            backgroundColor: filtro === "todas" ? "#007bff" : "#ccc",
            color: filtro === "todas" ? "white" : "black",
          }}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro("naoconcluidas")}
          style={{
            backgroundColor: filtro === "naoconcluidas" ? "#007bff" : "#ccc",
            color: filtro === "naoconcluidas" ? "white" : "black",
          }}
        >
          Não Concluídas
        </button>
        <button
          onClick={() => setFiltro("concluidas")}
          style={{
            backgroundColor: filtro === "concluidas" ? "#007bff" : "#ccc",
            color: filtro === "concluidas" ? "white" : "black",
          }}
        >
          Concluídas
        </button>
      </div>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada</p>
      ) : (
        <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Título
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Descrição
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.tarefaId} style={{ backgroundColor: "#fff" }}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {tarefa.titulo}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {tarefa.descricao}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {tarefa.status}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {tarefa.status === "Não iniciada" && (
                    <button
                      onClick={() =>
                        atualizarStatus(tarefa.tarefaId, "Em andamento")
                      }
                    >
                      Iniciar
                    </button>
                  )}
                  {tarefa.status === "Em andamento" && (
                    <button
                      onClick={() => atualizarStatus(tarefa.tarefaId, "Concluída")}
                    >
                      Concluir
                    </button>
                  )}
                  {tarefa.status !== "Concluída" && (
                    <button
                      onClick={() => usarPatch(tarefa.tarefaId)}
                      style={{ marginLeft: "5px" }}
                    >
                      Auto Avançar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarTarefas;
