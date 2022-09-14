import React, {useEffect, useState} from 'react';
import CreateIcon from '@material-ui/icons/Create';
import style from '../Users/users.module.css';
import TextField from '@material-ui/core/TextField/TextField';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

type EditModeParams = {
    value: string | null
    isOwner: boolean
    label: string
    length: number
    callback: (value: string) => void
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginLeft: theme.spacing(1),
                paddingTop: '3px'

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
export const EditMode = (props: EditModeParams) => {

    const classes = useStyles();

    const [valueInput, setValueInput] = useState(props.value ? props.value : '')
    const [editMode, setEditMode] = useState(false)

    function onClickHandler() {
        setEditMode(true)
    }

    function onBlurHandler() {

        if (valueInput !== props.value) {
            valueInput && props.callback(valueInput)
        }
        setEditMode(false)
    }

    useEffect(() => {
        if (props.value) {
            setValueInput(props.value)
        }
    }, [props.value])

    return (
        <>
            {props.isOwner
                ? <>
                    {editMode
                        ? <TextField
                            id={props.label}
                            multiline
                            autoFocus={true}
                            maxRows={4}
                            inputProps={{maxLength: props.length}}
                            value={valueInput}
                            onBlur={onBlurHandler}
                            color={'primary'}
                            error={valueInput.length > props.length - 1}
                            helperText={`максимум ${props.length} символов`}
                            onFocus={(e) =>
                                e.currentTarget.setSelectionRange(
                                    e.currentTarget.value.length,
                                    e.currentTarget.value.length
                                )}
                            className={classes.root}
                            onChange={e => setValueInput(e.currentTarget.value)}

                        />

                        : <>
                            <SpanText value={props.value}
                                      className={style.textStatus}/>

                            <IconButton size={'small'} disabled={editMode} onClick={onClickHandler}>
                                <CreateIcon className={style.icon}/>
                            </IconButton>
                        </>
                    }
                </>
                : <SpanText value={props.value}/>
            }
        </>
    );
};

type SpanTextType = {
    value: string | null
    className?: string
    callback?: () => void
}
const SpanText = (props: SpanTextType) => {
    return <span className={props.className}
                 onDoubleClick={props.callback}>
            {props.value || 'нету даных'}
        </span>
}

