import axios from 'axios';

import { mostrarMensagem } from './mensagensReducer';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL
});

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE',
  ATUALIZAR: 'TAREFAS_ATUALIZAR'
};
const INITIAL_STATE = {
  tarefas: [],
  quantidade: 0
};
export const tarefaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return {
        ...state,
        tarefas: action.tarefas,
        quantidade: action.tarefas.length
      };

    case ACTIONS.ADD:
      const taskAddList = [...state.tarefas, action.tarefa];
      return { ...state, tarefas: taskAddList, quantidade: taskAddList.length };

    case ACTIONS.REMOVER:
      const taskList = state.tarefas.filter(tarefa => tarefa.id !== action.id);
      return { ...state, tarefas: taskList, quantidade: taskList.length };

    case ACTIONS.ATUALIZAR:
      const lista = [...state.tarefas];
      lista.forEach(t => {
        if (t.id === action.id) {
          t.done = true;
        }
      });
      return { ...state, tarefas: lista };

    default:
      return state;
  }
};

export function listar() {
  return dispatch => {
    http
      .get('/tarefas', {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch({
          type: ACTIONS.LISTAR,
          tarefas: response.data
        });
      });
  };
}

export function salvar(tarefa) {
  return dispatch => {
    http
      .post('/tarefas', tarefa, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch([
          {
            type: ACTIONS.ADD,
            tarefa: response.data
          },
          mostrarMensagem('Tarefa salva com sucesso!')
        ]);
      });
  };
}

export function deletar(id) {
  return dispatch => {
    http
      .delete(`/tarefas/${id}`, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch([
          {
            type: ACTIONS.REMOVER,
            id: id
          },
          mostrarMensagem('Tarefa apagada com sucesso!')
        ]);
      });
  };
}

export function atualizar(id) {
  return dispatch => {
    http
      .patch(`/tarefas/${id}`, null, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch([
          {
            type: ACTIONS.ATUALIZAR,
            id: id
          },
          mostrarMensagem('Tarefa atualizada com sucesso!')
        ]);
      });
  };
}
