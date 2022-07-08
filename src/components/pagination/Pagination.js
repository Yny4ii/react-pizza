import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../redux/slices/filterSlice";

const Pagination = () => {
    const dispatch = useDispatch();
    const onClickPage = (event) => {
        dispatch(setCurrentPage(event.selected + 1))
    }
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onClickPage(event)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;