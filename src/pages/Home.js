import React, {useEffect, useState} from 'react';

import Loader from "../components/pizzaBlock/Loader";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Pagination from "../components/pagination/Pagination";
import {SearchContext} from "../App";
import {useSelector} from "react-redux";
import axios from "axios";

const Home = () => {
    const api = 'https://61f167bd072f86001749f1cd.mockapi.io/pizzas';
    const {searchInput, setSearchInput} = React.useContext(SearchContext);

    const {categoryId, sortType} = useSelector(state => state.filter)
    const currentPage = useSelector(state => state.pagination.currentPage)

    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [descSorting, setDescSorting] = useState(true);


    useEffect(() => {
        const search = searchInput ? `&search=${searchInput}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const typeOfSort = descSorting ? "desc" : "asc"

        setLoading(true)
        axios.get(`${api}?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort}&order=${typeOfSort}${search}`)
            .then((res) => {
                setPizzas(res.data);
                setLoading(false)
            })
        console.log(currentPage)

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