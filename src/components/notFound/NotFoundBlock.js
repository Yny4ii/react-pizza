import React from 'react';
import styles from './NotFound.module.scss';

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😞</span>
                <br/>
                Ничего не нашлось
            </h1>
            <p className={styles.description}>Данная страница не была найдена на нашем сайте</p>
        </div>
    );
};

export default NotFoundBlock;