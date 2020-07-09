import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collectionpreview/collectionpreview.component'

import './collection-overview.styles.scss';

const CollectionOverview = ({collections, match, history}) => (
    <div className='collection-overview'>
        <h2>COLLECTIONS</h2>
        {
            collections.map(({id, ...othercollectionprops}) =>(
                <CollectionPreview key={id} match={match} history={history} {...othercollectionprops}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview);

