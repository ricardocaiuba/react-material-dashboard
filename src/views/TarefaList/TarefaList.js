import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listar, salvar, deletar, atualizar } from '../../store/tarefasReducer';
import { esconderMensagem } from '../../store/mensagensReducer';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';

import { TarefasToolbar, TarefasTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = props => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable
          alterarStatus={props.atualizar}
          deletarTarefa={props.deletar}
          tarefas={props.tarefas}
        />
      </div>
      <Dialog
        onClose={props.esconderMensagem}
        open={props.openDialog}
      >
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{props.message}</DialogContent>
        <DialogActions>
          <Button onClick={props.esconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas,
  message: state.messages.message,
  openDialog: state.messages.showMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listar,
      salvar,
      deletar,
      atualizar,
      esconderMensagem
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TarefaList);
