import React from "react";
import { connect } from "react-redux";
import { FormSpy } from "react-final-form";
import { updateFormState } from "../actions";

// This component will be called whenever form wil be rerendered. This component updates the redux store with the current form values
const FormStateToRedux = ({ form, updateFormState }) => {
  return <FormSpy onChange={(state) => updateFormState(form, state)} />;
};

export default connect(undefined, { updateFormState })(FormStateToRedux);
