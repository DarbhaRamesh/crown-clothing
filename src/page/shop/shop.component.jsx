import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionSnapshotTOMap } from '../../Firebase/firebase.util';
import { updateCollection } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);
class ShopPage extends Component {

   state = {
        loading: true
    }
    
    unSubscribeFromSnapshot = null;

    componentDidMount() {

        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot =>{
            const collectionsMap = convertCollectionSnapshotTOMap(snapshot);
            await updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }


    render(){
        const {loading} = this.state;
        const { match } = this.props;

        return(
            <div className='shop-page'>
                <Route exact path= {`${match.path}`} 
                render ={(props) => <CollectionOverviewWithSpinner 
                    isLoading = {loading} 
                    {...props}/>} />
                <Route path= {`${match.path}/:collectionId`} 
                render = {(props) => <CollectionPageWithSpinner 
                    isLoading = {loading} 
                    {...props}/>} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>({
    updateCollections: collectionMap => dispatch(updateCollection(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);