import { useState, useEffect } from "react";
import { Tarefa } from "../../Models/tarefas";
import axios from "axios";

function AlterarTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      setCarregando(true);
      const resposta = await axios.get(
        "http://localhost:5000/api/tarefas/listar"
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

  async function alterarStatus() {
    if (!tarefaSelecionada) {
      setErro("Selecione uma tarefa");
      return;
    }

    try {
      const tarefa = tarefas.find((t) => t.tarefaId === tarefaSelecionada);
      if (!tarefa) return;

      const novoStatus =
        tarefa.status === "Não iniciada"
          ? "Em andamento"
          : tarefa.status === "Em andamento"
          ? "Concluída"
          : tarefa.status;

      const tarefaAtualizada: Tarefa = {
        ...tarefa,
        status: novoStatus,
      };

      await axios.put(
        `http://localhost:5000/api/tarefas/alterar/${tarefaSelecionada}`,
        tarefaAtualizada
      );

      setMensagem("Status alterado com sucesso!");
      setErro("");
      setTarefaSelecionada(null);
      carregarTarefas();
    } catch (error: any) {
      console.log(error);
      setErro("Erro ao alterar status da tarefa!");
      setMensagem("");
    }
  }

  if (carregando) {
    return <div>Carregando tarefas...</div>;
  }

  const tarefaSelecionadaObj = tarefas.find(
    (t) => t.tarefaId === tarefaSelecionada
  );

  return (
    <div>
      <h1>Alterar Status da Tarefa</h1>
      {erro && <p>{erro}</p>}
      {mensagem && <p>{mensagem}</p>}

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa disponível</p>
      ) : (
        <div>
          <div>
            <label>Selecione uma tarefa:</label>
            <select
              value={tarefaSelecionada || ""}
              onChange={(e) => setTarefaSelecionada(e.target.value)}
            >
              <option value="">-- Escolha uma tarefa --</option>
              {tarefas.map((tarefa) => (
                <option key={tarefa.tarefaId} value={tarefa.tarefaId}>
                  {tarefa.titulo} (Status: {tarefa.status})
                </option>
              ))}
            </select>
          </div>

          {tarefaSelecionadaObj && (
            <div>
              <p>
                <strong>Título:</strong> {tarefaSelecionadaObj.titulo}
              </p>
              <p>
                <strong>Descrição:</strong> {tarefaSelecionadaObj.descricao}
              </p>
              <p>
                <strong>Status Atual:</strong> {tarefaSelecionadaObj.status}
              </p>
              <p>
                <strong>Novo Status:</strong>{" "}
                {tarefaSelecionadaObj.status === "Não iniciada"
                  ? "Em andamento"
                  : tarefaSelecionadaObj.status === "Em andamento"
                  ? "Concluída"
                  : "Sem alteração"}
              </p>
            </div>
          )}

          <div>
            <button onClick={alterarStatus} disabled={!tarefaSelecionada}>
              Alterar Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlterarTarefa;
