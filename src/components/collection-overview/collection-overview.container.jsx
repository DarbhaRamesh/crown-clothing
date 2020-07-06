import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import withSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionOverview from './collection-overview.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionOverview);

//connect(mapStateToProps)(withSpinner(CollectionOverview))

export default CollectionOverviewContainer