import React, {FC, useState} from 'react';
import {Input} from "../common/input/Input";
import style from './users.module.css'

type StatusType = {
    valueStatus: string | null
    isAuthorizedUser: boolean
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
            Статус:{props.isAuthorizedUser
            ? (editMode
                    ? <Input id={'status'}
                             name={'status'}
                             value={valueStatus}
                             autoFocus={true}
                             onChange={e => setValueStatus(e.currentTarget.value)}
                             onBlur={onBlurHandler}
                             className={style.statusInput}
                    />
                    : <SpanStatus valueStatus={props.valueStatus}
                                  className={style.textStatus}
                                  callback={onDoubleClickHandler}/>
            )
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


