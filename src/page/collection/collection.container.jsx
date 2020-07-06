import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux';

import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionLoaded
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionPage);

export default CollectionPageContainer;

//connect(mapStateToProps)(withSpinner(CollectionOverview))
