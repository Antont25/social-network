import React, { ReactElement, useEffect, useState } from 'react';

import IconButton from '@material-ui/core/IconButton/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import CreateIcon from '@material-ui/icons/Create';

import { SpanText } from 'common/components/EditMode/SpanText';
import style from 'components/User/users.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginLeft: theme.spacing(1),
        paddingTop: '3px',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#2186c4',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#2186c4',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#2186c4',
      },
    },
  }),
);

export const EditMode = ({
  isOwner,
  label,
  length,
  value,
  onSaveName,
}: EditModeParams): ReactElement => {
  const classes = useStyles();

  const [valueInput, setValueInput] = useState(value || '');
  const [editMode, setEditMode] = useState(false);

  const onClickHandler = (): void => {
    setEditMode(true);
  };

  const onBlurHandler = (): void => {
    if (valueInput !== value && valueInput) {
      onSaveName(valueInput);
    }
    setEditMode(false);
  };

  useEffect(() => {
    if (value) {
      setValueInput(value);
    }
  }, [value]);

  return (
    <span>
      {isOwner ? (
        <span>
          {editMode ? (
            <TextField
              id={label}
              multiline
              autoFocus
              maxRows={4}
              inputProps={{ maxLength: length }}
              value={valueInput}
              onBlur={onBlurHandler}
              color="primary"
              error={valueInput.length > length - 1}
              helperText={`максимум ${length} символов`}
              onFocus={e =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length,
                )
              }
              className={classes.root}
              onChange={e => setValueInput(e.currentTarget.value)}
            />
          ) : (
            <>
              <SpanText value={value} className={style.textStatus} />

              <IconButton size="small" disabled={editMode} onClick={onClickHandler}>
                <CreateIcon className={style.icon} />
              </IconButton>
            </>
          )}
        </span>
      ) : (
        <SpanText value={value} />
      )}
    </span>
  );
};

// type
type EditModeParams = {
  value: string | null;
  isOwner: boolean;
  label: string;
  length: number;
  onSaveName: (value: string) => void;
};
