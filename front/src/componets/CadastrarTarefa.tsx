import { useState } from "react";
import { Tarefa } from "../Models/tarefas";
import axios from "axios";

function CadastrarTarefa() {
  //Estados
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function enviarTarefa(event: any) {
    event.preventDefault();
    submeterTarefaAPI();
  }

  async function submeterTarefaAPI() {
    //Biblioteca AXIOS
    try {
      const tarefa: Tarefa = {
        titulo,
        descricao,
        status: "Não iniciada",
      };
      const resposta = await axios.post(
        "http://localhost:5000/api/tarefas/cadastrar",
        tarefa
      );
      console.log(resposta.data);
      setMensagem("Tarefa cadastrada com sucesso!");
      setErro("");
      setTitulo("");
      setDescricao("");
    } catch (error: any) {
      console.log(error);
      setErro("Erro ao cadastrar tarefa!");
      setMensagem("");
    }
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={enviarTarefa}>
        <div>
          <label>Título:</label>
          <input
            value={titulo}
            onChange={(e: any) => setTitulo(e.target.value)}
            type="text"
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarTarefa;
