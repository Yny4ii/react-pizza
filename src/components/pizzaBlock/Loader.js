import React from 'react';
import ContentLoader from "react-content-loader"


const Loader = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#ededed"
        foregroundColor="#f9f6f6"
        {...props}
    >
        <circle cx="140" cy="140" r="140" />
        <rect x="0" y="290" rx="7" ry="7" width="280" height="20" />
        <rect x="0" y="330" rx="8" ry="8" width="280" height="70" />
        <rect x="0" y="425" rx="7" ry="7" width="90" height="25" />
        <rect x="165" y="420" rx="7" ry="7" width="112" height="35" />
    </ContentLoader>
)


export default Loader;