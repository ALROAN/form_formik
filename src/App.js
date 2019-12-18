import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik'
import { resolve } from 'dns';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


function MyForm(props) {
    const {
        isValid,
        isSubmitting,
    } = props


    return (
        <Form >

            <div className="row">
                Email:
                <Field type="email" name="email" className="input" />
                <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Password:
                <Field type="password" name="password" className="input" />
                <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>

            </div>


            <div className="row">
                <button
                    className={`sumbit ${isSubmitting || !isValid ? 'disable' : ''}`}
                    disabled={isSubmitting || !isValid}
                    type="submit"
                >
                    Submit
            </button>
            </div>
        </Form>
    )
}

export default withFormik({

    mapPropsToValues(props) {
        return {
            email: "",
            password: ""
        };
    },

    async validate(values) {
        const errors = {}

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        await sleep(1000);
        if (Object.keys(errors).length) {
            return errors;
        }

    },

    handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        console.log(values);
    },
})(MyForm);