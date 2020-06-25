import React, {Component} from 'react';

import SHOP_DATA from './shop.data'

import CollectionPreview from '../../components/collectionpreview/collectionpreview.component'


class ShopPage extends Component {
    constructor(props){
        super(props)

        this.state ={
            collections : SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state;
        return(
            <div className='shop-page'>
                <h1>COLLECTIONS</h1>
                {
                    collections.map(({id, ...othercollectionprops}) =>(
                        <CollectionPreview key={id} {...othercollectionprops}/>
                    ))
                }
            </div>
        )
    }
}

export default ShopPage