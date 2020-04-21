import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TarefasTable = props => {
  const { className, tarefas, alterarStatus, deletarTarefa, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map(t => {
                  return (
                    <TableRow key={t.id}>
                      <TableCell>{t.id}</TableCell>
                      <TableCell>{t.descricao}</TableCell>
                      <TableCell>{t.categoria}</TableCell>
                      <TableCell>{t.done ? 'Feito' : 'Pendente'}</TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => props.alterarStatus(t.id)}
                        >
                          {t.done ? <DoneAllIcon /> : <TimerIcon />}
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => props.deletarTarefa(t.id)}
                        >
                          <DeleteIcon style={{ color: '#848484' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  tarefas: PropTypes.array.isRequired
};

export default TarefasTable;
