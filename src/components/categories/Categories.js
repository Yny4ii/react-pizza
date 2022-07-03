import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const Categories = ({activeCategory, onClickCategory}) => {


    return (<div className="categories">
            <ul>
                {categories.map((e, index) => (
                    <li key={index}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => onClickCategory(index)}>{e}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;