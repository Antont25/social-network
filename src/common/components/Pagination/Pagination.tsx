import React, { ReactElement, useMemo } from 'react';

import { ListItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

import style from './pagination.module.css';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { setCurrentPage, setPortionsNumber } from 'redux/usersSlice';

const amountItemPage = 10;

export const Pagination = React.memo(
  ({
    currentPage,
    pageSize,
    totalCount,
    portionsNumber,
  }: PaginationPropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const { portions, arrayPages } = useMemo((): {
      portions: number;
      arrayPages: Array<number>;
    } => {
      const pages = Math.ceil(totalCount / pageSize);
      const arrayPages = [];

      for (let i = 1; i <= pages; i++) {
        arrayPages.push(i);
      }

      return {
        portions: Math.ceil(pages / amountItemPage),
        arrayPages,
      };
    }, [totalCount, pageSize]);

    const leftPortions = (portionsNumber - 1) * amountItemPage + 1;
    const rightPortions = portionsNumber * amountItemPage;
    const showPage = arrayPages
      .filter((item: number) => item >= leftPortions && item <= rightPortions)
      .map((item, index) => (
        <ListItem
          button
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
          className={
            item === currentPage
              ? `${style.active} ${style.listItemNum}`
              : style.listItemNum
          }
          onClick={() => dispatch(setCurrentPage(item))}
        >
          {item}
        </ListItem>
      ));

    const onLeftClick = (): void => {
      dispatch(setPortionsNumber(portionsNumber - 1));
    };

    const onRightClick = (): void => {
      dispatch(setPortionsNumber(portionsNumber + 1));
    };

    return (
      <div className={style.paginationBlock}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          /* eslint-disable-next-line no-magic-numbers */
          disabled={portionsNumber < 2}
          onClick={onLeftClick}
        >
          <ArrowBack />
        </IconButton>
        <List>{showPage}</List>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          disabled={portionsNumber === portions}
          onClick={onRightClick}
        >
          <ArrowForward />
        </IconButton>
      </div>
    );
  },
);
// type
type PaginationPropsType = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  portionsNumber: number;
};
