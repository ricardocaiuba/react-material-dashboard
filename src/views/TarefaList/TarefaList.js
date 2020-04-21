import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';

import { TarefasToolbar, TarefasTable } from './components';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';

  const handleSalvar = tarefa => {
    axios
      .post(API_URL, tarefa, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        const newTask = response.data;
        setTarefas([...tarefas, newTask]);
        setMessage('Item adicionado com sucesso!');
        setOpenDialog(true);
      })
      .catch(erro => {
        setMessage('Ocorreu um erro!');
        setOpenDialog(true);
      });
  };

  const handleTaskList = () => {
    axios
      .get(API_URL, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        const taskList = response.data;
        setTarefas(taskList);
      })
      .catch(erro => {
        setMessage('Ocorreu um erro!');
        setOpenDialog(true);
      });
  };

  const changeStatus = id => {
    axios
      .patch(`${API_URL}/${id}`, null, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        const taskList = [...tarefas];
        taskList.forEach(t => {
          if (t.id === id) {
            t.done = true;
          }
        });
        setTarefas(taskList);
        setMessage('Item atualizado com sucesso!');
        setOpenDialog(true);
      })
      .catch(erro => {
        setMessage('Ocorreu um erro!');
        setOpenDialog(true);
      });
  };

  const hadleDeleteTask = id => {
    axios
      .delete(`${API_URL}/${id}`, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        const taskList = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(taskList);
        setMessage('Item removido com sucesso!');
        setOpenDialog(true);
      })
      .catch(erro => {
        setMessage('Ocorreu um erro!');
        setOpenDialog(true);
      });
  };

  useEffect(() => {
    handleTaskList();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={handleSalvar} />
      <div className={classes.content}>
        <TarefasTable
          alterarStatus={changeStatus}
          deletarTarefa={hadleDeleteTask}
          tarefas={tarefas}
        />
      </div>
      <Dialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      >
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
