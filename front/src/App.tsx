import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import ListarTarefas from "./pages/tarefa/listar";
import CadastrarTarefa from "./pages/tarefa/cadastrar";
import AlterarTarefa from "./pages/tarefa/alterar";
import ListarTarefasConcluidas from "./pages/tarefa/concluidas";
import ListarTarefasNaoConcluidas from "./pages/tarefa/naoconcluidas";

//Instalar biblioteca na aplicação
//npm i nome_biblioteca @types/nome_biblioteca

//Componentes
// - HTML, CSS e JS ou TS
function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/tarefa/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/tarefa/cadastrar">Cadastrar Tarefa</Link>
            </li>
            <li>
              <Link to="/tarefa/alterar">Alterar Tarefa</Link>
            </li>
            <li>
              <Link to="/tarefa/concluidas">Tarefas Concluídas</Link>
            </li>
            <li>
              <Link to="/tarefa/naoconcluidas">Tarefas Não Concluídas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tarefa/listar" element={<ListarTarefas/>} />
          <Route path="/tarefa/cadastrar" element={<CadastrarTarefa/>} />
          <Route path="/tarefa/alterar" element={<AlterarTarefa/>} />
          <Route path="/tarefa/concluidas" element={<ListarTarefasConcluidas/>} />
          <Route path="/tarefa/naoconcluidas" element={<ListarTarefasNaoConcluidas/>} />
        </Routes>
        <footer>
          Rodapé da aplicação
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;