import React from 'react';
import './collectionpreview.styles.scss'

import CollectionItem from '../collectionitem/collectionitem.component'

const CollectionPreview = ({title, items, routeName, match, history}) => {
    return (
    <div className='collection-preview'>
        <h1 className = 'title' onClick= {() => history.push(`${match.path}/${routeName}`) }> {title.toUpperCase()} </h1>
        <div className= 'preview'>
            {
                items.filter((item,idx) =>idx<4)
                .map((item) =>(
                        <CollectionItem key = {item.id} item={item} />
                ))
            }
        </div>
    </div>
    )   
}

export default CollectionPreview