import React from 'react';
import style from '../components/Dialogs/dialogs.module.css'
import Message from '../components/Dialogs/Messages/Message';
import {DialogItems} from '../components/Dialogs/DialogItems';
import {Textarea} from '../components/common/Textarea/Textarea';
import {connect} from 'react-redux';
import {AppStoreType} from '../redux/store';
import {addMessage, DialogsType, MessagesType} from '../redux/dialogsReducer';
import {withAuthRedirect} from '../utils/hoc/withAuthRedirect';
import {validationPostAndDialog} from '../utils/validation/validation';


type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    massages: Array<MessagesType>
}
type MapDispatchToPropsType = {
    addMessage: (newText: string) => void
}

const Dialogs = (props: DialogsPropsType) => {

    return (
        <div className={style.dialogs}>
            <ul>
                {props.dialogs.map(item => <DialogItems key={item.id} name={item.name} id={`${item.id}`}/>)}

            </ul>

            <ul className={style.dialogItem}>
                <div>
                    <Textarea callback={props.addMessage}
                              validationSchema={validationPostAndDialog}
                    />
                </div>
                {props.massages.map(item => <Message key={item.id} message={item.message}/>)}

            </ul>
        </div>
    );
};

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        massages: state.dialogsPage.messages
    }
}


export default withAuthRedirect(connect(mapStateToProps, {addMessage})(Dialogs));