import { AppState } from '../reducers/Reducer';

import Publish,{ PublishProps,  } from '../screens/Publish';
import { Dispatch } from 'redux';
import { PublishAction, updateIdea } from '../actions/PublishAction';
import { connect } from 'react-redux';


const mapStateToProps = (state: AppState): PublishProps => ({
  idea: state.publish.idea,
});


interface DispatchProps {
    updateIdea: (i: string) => void;
  }

  const mapDispatchToProps = (dispatch: Dispatch<PublishAction>): DispatchProps => ({
    updateIdea: (i: string) => {
      dispatch(updateIdea(i));
    },
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Publish);