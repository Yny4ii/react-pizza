import React, {useState} from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const Categories = () => {
        const [activeCategory, setActiveCategory] = useState(0);

        const onClickCategory = (index) => {
            setActiveCategory(index)
        }
        return (<div className="categories">
                <ul>
                    {categories.map((e, index) => (
                        <li
                            className={activeCategory === index ? 'active' : ''}

                            onClick={() => onClickCategory(index)} key={index}>{e}</li>
                    ))}
                </ul>
            </div>
        );
    }
;

export default Categories;