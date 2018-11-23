import { reducer, FormState, FormAction } from 'redux-form';

const formReducer = reducer.plugin({
  login: (state, action: FormAction): FormState | undefined => {
    const {type} = action;

    switch (type) {

      default:
        return state;
    }
  },
});

export default formReducer;