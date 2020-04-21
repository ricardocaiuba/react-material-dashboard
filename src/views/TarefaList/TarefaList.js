import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

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
  const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
  const headers = { 'x-tenant-id': 'ricardo.caiuba@gmail.com' };

  const handleSalvar = tarefa => {
    axios
      .post(API_URL, tarefa, {
        headers: headers
      })
      .then(response => {
        handleTaskList();
      })
      .catch(erro => {
        console.log(erro);
      });
  };

  const handleTaskList = () => {
    axios
      .get(API_URL, {
        headers: headers
      })
      .then(response => {
        const taskList = response.data;
        console.log(taskList);
        setTarefas(taskList);
      })
      .catch(erro => {
        console.log(erro);
      });
  };

  useEffect(() => {
    handleTaskList();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={handleSalvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefaList;
