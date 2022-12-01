import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';

import { InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    border: ' 1px solid #41484f',
    color: '#2186c4',
    paddingLeft: '5px',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

type SearchType = {
  setValueSearchInput: Dispatch<SetStateAction<string>>;
  valueSearchInput: string;
};
export const Search = ({
  setValueSearchInput,
  valueSearchInput,
}: SearchType): ReactElement => {
  const classes = useStyles();

  const onInputSearchChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValueSearchInput(e.currentTarget.value);
  };
  const onClearClick = (): void => {
    setValueSearchInput('');
  };

  return (
    <div style={{ display: 'flex', margin: '0  auto 20px auto', maxWidth: '300px' }}>
      <InputBase
        onChange={onInputSearchChange}
        className={classes.input}
        value={valueSearchInput}
        placeholder="Search name user"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="clear"
        onClick={onClearClick}
      >
        <ClearIcon />
      </IconButton>
    </div>
  );
};
