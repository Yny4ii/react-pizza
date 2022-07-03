import React, {useEffect, useState} from 'react';

import Loader from "../components/pizzaBlock/Loader";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Pagination from "../components/pagination/Pagination";
import {SearchContext} from "../App";

const Home = () => {
    const api = 'https://61f167bd072f86001749f1cd.mockapi.io/pizzas';
    const {searchInput, setSearchInput} = React.useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState({name: 'популярности', sort: 'rating'});
    const [activeCategory, setActiveCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [descSorting, setDescSorting] = useState(true);


    useEffect(() => {
        const search = searchInput ? `&search=${searchInput}` : '';
        const category = activeCategory > 0 ? `category=${activeCategory}` : '';
        const typeOfSort = descSorting ? "desc" : "asc"

        setLoading(true)
        fetch(`${api}?page=${currentPage}&limit=4&${category}&sortBy=${sort.sort}&order=${typeOfSort}${search}`)
            .then((res) => res.json())
            .then((res) => {
                setPizzas(res);
                setLoading(false)
            })

    }, [activeCategory, sort, searchInput, descSorting, currentPage])

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
                <Categories activeCategory={activeCategory} onClickCategory={(index) => setActiveCategory(index)}/>
                <Sort setSort={setSort} sort={sort} descSorting={descSorting} setDescSorting={setDescSorting}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loading ? skeletons : items
                }
            </div>
            <Pagination setCurrentPage={setCurrentPage}/>
        </div>

    );
};

export default Home;