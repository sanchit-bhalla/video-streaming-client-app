import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import FormStateToRedux from "../FormStateToRedux";
import { createStream } from "../../actions";

const StreamCreate = (props) => {
  const onSubmit = (formValues) => {
    props.createStream(formValues);
  };

  const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
      errors.title = "You must enter a title";
    }

    if (!formValues.description) {
      errors.description = "You must enter a description";
    }

    return errors;
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{}}
      subscription={{ submitting: true, pristine: true }}
    >
      {/* pristine is opposite of dirty i.e abhi tk form me kuch values nhi haan even if koi field focused haa */}
      {({ handleSubmit, form, submitting, pristine }) => (
        <form className="ui form error" onSubmit={handleSubmit}>
          <FormStateToRedux form="streamCreate" />

          <Field
            name="title"
            component={renderInput}
            type="text"
            placeholder="Enter Title"
            label="Enter Title"
          />

          <Field
            name="description"
            component={renderInput}
            type="text"
            placeholder="Enter description"
            label="Enter description"
          />

          <div className="buttons">
            <button
              className="ui button primary"
              type="submit"
              disabled={submitting || pristine}
            >
              Submit
            </button>

            <button
              className="ui button"
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>

          {/* <FormStateFromRedux form="example" /> */}
        </form>
      )}
    </Form>
  );
};

export default connect(null, { createStream })(StreamCreate);
