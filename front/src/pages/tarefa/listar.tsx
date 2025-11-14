import { useState, useEffect } from "react";
import { Tarefa } from "../../Models/tarefas";
import axios from "axios";

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/tarefas/listar").then(r => setTarefas(r.data)).catch(() => setErro("Erro"));
  }, []);

  return (
    <div>
      <h1>Listar Tarefas</h1>
      {erro && <p>{erro}</p>}
      <table border={1}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((t) => (
            <tr key={t.tarefaId}>
              <td>{t.titulo}</td>
              <td>{t.descricao}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefas;
