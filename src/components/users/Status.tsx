import React, {FC, useState} from 'react';
import style from './users.module.css'
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField/TextField';

type StatusType = {
    valueStatus: string | null
    isOwner: boolean
    callback: (value: string) => void
}

export const Status: FC<StatusType> = (props) => {
    const [valueStatus, setValueStatus] = useState(props.valueStatus)
    const [editMode, setEditMode] = useState(false)

    function onDoubleClickHandler() {
        setEditMode(true)
    }

    function onBlurHandler() {
        if (valueStatus !== props.valueStatus) {
            valueStatus && props.callback(valueStatus)
        }

        setEditMode(false)
    }

    return (
        <div className={style.statusBloc}>
            Статус:
            {props.isOwner
                ? <>
                    <CreateIcon className={style.icon} onClick={onDoubleClickHandler}/>
                    {editMode
                        ? <TextField
                            id={'status'}
                            label="status"
                            multiline
                            autoFocus={true}
                            maxRows={4}
                            inputProps={{maxLength: 100}}
                            value={valueStatus}
                            onBlur={onBlurHandler}
                            className={style.statusInput}
                            onChange={e => setValueStatus(e.currentTarget.value)}
                            variant="filled"/>

                        : <SpanStatus valueStatus={props.valueStatus}
                                      className={style.textStatus}/>
                    }
                </>
                : <SpanStatus valueStatus={props.valueStatus}/>
            }

        </div>

    );
};

type SpanStatusType = {
    valueStatus: string | null
    className?: string
    callback?: () => void
}
const SpanStatus = (props: SpanStatusType) => {
    return <span className={props.className}
                 onDoubleClick={props.callback}>
            {props.valueStatus || 'нету даных'}
        </span>
}


