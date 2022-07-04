import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../../redux/slices/filterSlice";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId)

    const onClickCategory = (index) => {
        dispatch(setCategoryId(index))
    }

    return (<div className="categories">
            <ul>
                {categories.map((e, index) => (
                    <li key={index}
                        className={categoryId === index ? 'active' : ''}
                        onClick={() => onClickCategory(index)}>{e}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;