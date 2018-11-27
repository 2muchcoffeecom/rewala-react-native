import React from 'react';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import { RootState } from '../../../redux/store';
import { Dispatch } from 'redux';

import { Actions as toastActions } from '../../../redux/toast/AC';

interface StateProps {
  message: string | null;
}

interface DispatchProps {
  resetToastMessage(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  message: state.toast.message,
});

const mapDispatchToProps = (dispatch: Dispatch<toastActions>): DispatchProps => (
  {
    resetToastMessage: () => {
      dispatch(toastActions.hideToast());
    },
  }
);

type Props = StateProps & DispatchProps;

class RootToast extends React.PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.message && this.props.message !== prevProps.message) {
      this.toast.show(this.props.message);
      this.props.resetToastMessage();
    }
  }

  public toast: Toast;

  private setToastRef = (elem: Toast) => {
    this.toast = elem;
  }

  render() {
    return (
      <Toast
        ref={this.setToastRef}
        opacity={0.75}
      />
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RootToast);