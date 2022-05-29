import './App.css';
import './scss/app.scss'
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import pizzas from './assets/db.json';

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map((pizza) => (
                            <PizzaBlock
                                pizzaName={pizza.name}
                                pizzaPrice={pizza.price}
                                pizzaImageUrl={pizza.imageUrl}
                                pizzaTypes={pizza.types}
                                pizzaSizes={pizza.sizes}
                                pizzaCategory={pizza.category}
                                pizzaRating={pizza.rating}
                            />

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default App;
