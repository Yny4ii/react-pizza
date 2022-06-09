import React, {useEffect, useState} from 'react';

import Loader from "../components/pizzaBlock/Loader";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";

const Home = () => {
    const api = 'https://61f167bd072f86001749f1cd.mockapi.io/pizzas';

    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState({name: 'популярности', sort: 'rating'});
    const [activeCategory, setActiveCategory] = useState(0);


    useEffect(() => {
        setLoading(true)
        fetch(`${api}?${activeCategory > 0 ? `category=${activeCategory}` : ''}&sortBy=${sort.sort}&order=desc`).then((res) => res.json()).then((res) => {
            setPizzas(res);
            setLoading(false)
        })

    }, [activeCategory, sort])


    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} onClickCategory={(index) => setActiveCategory(index)}/>
                <Sort setSort={setSort} sort={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loading ? [...new Array(12)].map((_, index) => (
                        <Loader key={index}/>)) : pizzas.map((pizza) => (
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
                    )
                }
            </div>
        </div>
    );
};

export default Home;