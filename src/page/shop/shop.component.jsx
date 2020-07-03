import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);
class ShopPage extends Component {

    componentDidMount() {
        const { fetchCollectionsAsync } = this.props;
        fetchCollectionsAsync();
    }


    render(){
        const { match, isCollectionFetching, isCollectionLoaded} = this.props;

        return(
            <div className='shop-page'>
                <Route exact path= {`${match.path}`} 
                render ={(props) => <CollectionOverviewWithSpinner 
                    isLoading = {isCollectionFetching} 
                    {...props}/>} />
                <Route path= {`${match.path}/:collectionId`} 
                render = {(props) => <CollectionPageWithSpinner 
                    isLoading = {!isCollectionLoaded} 
                    {...props}/>} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
   isCollectionFetching: selectIsCollectionFetching,
   isCollectionLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch =>({
    fetchCollectionsAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);