import React, {FC, useState} from 'react';
import {Input} from "../../common/input/Input";

type StatusType = {
    valueStatus: string | null
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
        <div>
            Статус:
            {editMode
                ? <Input id={'status'}
                         name={'status'}
                         label={'status'}
                         value={valueStatus}
                         autoFocus={true}
                         onChange={e => setValueStatus(e.currentTarget.value)}
                         onBlur={onBlurHandler}
                />
                : <span onDoubleClick={onDoubleClickHandler}>
                    {props.valueStatus || 'нету даных'}
            </span>

            }
        </div>

    );
};


