import React, {useMemo} from 'react';
import style from './pagination.module.css'
import IconButton from '@material-ui/core/IconButton';
import {ArrowBack, ArrowForward} from '@material-ui/icons';
import List from '@material-ui/core/List';
import {ListItem} from '@material-ui/core';
import {useAppDispatch} from '../../../utils/hooks/hooks';
import {setCurrentPage, setPortionsNumber} from '../../../redux/usersReducer';


type PaginationPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    portionsNumber: number
}

export const Pagination: React.FC<PaginationPropsType> = React.memo((props) => {
        const dispatch = useAppDispatch()
        let {portions, arrayPages} = useMemo((): { portions: number, arrayPages: Array<number>, } => {
            let pages = Math.ceil(props.totalCount / props.pageSize)
            let arrayPages = []
            for (let i = 1; i <= pages; i++) {
                arrayPages.push(i)
            }

            return {
                portions: Math.ceil(pages / 10),
                arrayPages,
            }

        }, [props.totalCount, props.pageSize])


        let leftPortions = (props.portionsNumber - 1) * 10 + 1
        let rightPortions = props.portionsNumber * 10
        let showPage = arrayPages.filter((item: number) => item >= leftPortions && item <= rightPortions)
            .map((item, index) => <ListItem button
                                            key={index}
                                            className={item === props.currentPage ? `${style.active} ${style.listItemNum}` : style.listItemNum}
                                            onClick={() => dispatch(setCurrentPage(item))}
            >
                {item}
            </ListItem>)


        function onClickLeftHandler() {
            dispatch(setPortionsNumber(props.portionsNumber - 1))
        }

        function onClickRightHandler() {
            dispatch(setPortionsNumber(props.portionsNumber + 1))
        }


        return (
            <div className={style.paginationBlock}>
                <IconButton color="primary"
                            aria-label="upload picture"
                            component="span"
                            disabled={props.portionsNumber < 2}
                            onClick={onClickLeftHandler}
                >
                    <ArrowBack/>
                </IconButton>
                <List>
                    {showPage}
                </List>
                <IconButton color="primary"
                            aria-label="upload picture"
                            component="span"
                            disabled={props.portionsNumber === portions}
                            onClick={onClickRightHandler}
                >
                    <ArrowForward/>
                </IconButton>

            </div>
        );
    }
)

