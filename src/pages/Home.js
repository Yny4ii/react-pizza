import React, {useEffect, useRef, useState} from 'react';

import Loader from "../components/pizzaBlock/Loader";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Categories from "../components/categories/Categories";
import Sort, {sortVariants} from "../components/sort/Sort";
import Pagination from "../components/pagination/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from "qs";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {setFilters} from "../redux/slices/filterSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const api = 'https://61f167bd072f86001749f1cd.mockapi.io/pizzas';
    const {searchInput, setSearchInput} = React.useContext(SearchContext);

    const {categoryId, sortType} = useSelector(state => state.filter)
    const currentPage = useSelector(state => state.filter.currentPage)

    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [descSorting, setDescSorting] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchPizzas = () => {
        setLoading(true)

        const search = searchInput ? `&search=${searchInput}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const typeOfSort = descSorting ? "desc" : "asc"

        axios.get(`${api}?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort}&order=${typeOfSort}${search}`)
            .then((res) => {
                setPizzas(res.data);
                setLoading(false)
            })
    }


    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sort: sortType.sort,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)}
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
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sortType, searchInput, descSorting, currentPage])




    const skeletons = [...new Array(12)].map((_, index) => (
        <Loader key={index}/>));
    const items = pizzas.map((pizza) => (
            <PizzaBlock
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
                    loading ? skeletons : items
                }
            </div>
            <Pagination/>
        </div>

    );
};

export default Home;