import React, {useEffect, useRef, useState} from 'react';

import Loader from "../components/pizzaBlock/Loader";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Categories from "../components/categories/Categories";
import Sort, {sortVariants} from "../components/sort/Sort";
import Pagination from "../components/pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import {useLocation, useNavigate} from "react-router-dom";
import {setFilters} from "../redux/slices/filterSlice";
import {fetchPizza} from "../redux/slices/pizzaSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const api = 'https://61f167bd072f86001749f1cd.mockapi.io/pizzas';
    const searchValue = useSelector(state => state.filter.searchValue)
    const {items, status} = useSelector(state => state.pizza);
    const {categoryId, sortType} = useSelector(state => state.filter)
    const currentPage = useSelector(state => state.filter.currentPage)

    const [descSorting, setDescSorting] = useState(true);

    const getPizzas = async () => {

        const search = searchValue ? `&search=${searchValue}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const typeOfSort = descSorting ? "desc" : "asc"
        dispatch(fetchPizza({api, search, category, typeOfSort, currentPage, sortType}))
    }


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sortType.sort,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sortType, currentPage])


    useEffect(() => {
        if (location.search) {
            const params = qs.parse(location.search.substring(1));
            const sortType = sortVariants.find(e => e.sort === params.sort);
            dispatch(setFilters({...params, sortType}))
            isSearch.current = true;
        }

    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortType, searchValue, descSorting, currentPage])


    const skeletons = [...new Array(12)].map((_, index) => (
        <Loader key={index}/>));
    const pizzas = items.map((pizza) => (
            <PizzaBlock
                id={pizza.id}
                key={pizza.id}
                pizzaName={pizza.name}
                pizzaPrice={pizza.price}
                pizzaImageUrl={pizza.imageUrl}
                pizzaTypes={pizza.types}
                pizzaSizes={pizza.sizes}
                pizzaCategory={pizza.category}
                pizzaRating={pizza.rating}/>
        )
    );

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort descSorting={descSorting} setDescSorting={setDescSorting}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading' ? skeletons : pizzas
                }
            </div>
            <Pagination/>
        </div>

    );
};

export default Home;