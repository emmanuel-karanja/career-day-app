import React from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';
import history from '../../Utils/history';

import {MyTextInput,
        MyStyledButton,
        MyStyledContainer,
        MyStyledForm,
        MySelectInput
  } from '../Common/MyFormComponents';


const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)?$/     
const jobApplicantUpdateSchema=Yup.object().shape({
   firstName: Yup.string()
             .min(2,"*First name must be at least 2 characters long")
			 .max(40, "*Names can't be longer than 40 characters")
             .required('*First Name is required'),
   lastName: Yup.string()
             .min(2,"*Last Name must be at least 2 characters long")
			 .max(40, "*Names can't be longer than 40 characters")
             .required('*Last Name is required'),
   email: Yup.string()
             .email("*Must be a valid email address")
             .max(100, "*Email must be less than 100 characters")
              .required("*Email is required"),
   phone: Yup.string()
            .matches(phoneRegExp, "*Phone number is not valid")
            .required("*Phone number required"),
   levelOfEducation: Yup.string()
              .oneOf(['POST_GRADUATE','GRADUATE','UNDER_GRADUATE_STUDENT','HIGHSCHOOL']
              ,"*Invalid level of education type")
              .required("*Job level of education is required"),
   yearsOfexperience : Yup.number()
                   .positive("*Invalid Input.Years of Experience must be positive")
                   .integer("*Invalid input. Years of experience must be an integer")
                   .min(1,'*Years of experience must be at least 1 year')
                   .max(40,'*Years of experience must be at most 40 years')
                   .required("Years of experience is required")
});

const JobApplicantUpdateForm=(props)=>{
    return(
        <MyStyledContainer fluid>
            <Formik 
               initialValues={{firstName:props.applicant.firstName, 
                               lastName:props.applicant.lastName,
							   email:props.applicant.email,
							   phone:props.applicant.phone,
							   levelOfEducation:props.applicant.levelOfEducation,
							   yearsOfxperience: props.applicant.yearsOfExperience
                               }}
               validationSchema={jobApplicantUpdateSchema}
               onSubmit={(values, {setSubmitting, resetForm})=>{
                   setSubmitting(true);
                       //alert(JSON.stringify(values,null,2));
                       //send the axios request here
                       const updatedApplicant={id: props.applicant.applicantId,...values};
                       props.updateApplicant(updatedApplicant);
                       resetForm();
                       setSubmitting(false);  
                       history.push("/registrationsuccess");             
               }}
               >
                   {({handleSubmit, isSubmitting})=>(
                       <MyStyledForm onSubmit={handleSubmit} className="mx-auto">
                               <Form.Group>   
                               <MyTextInput label="First Name"
                                          name="firstName"
                                          type="text"
                                          placeholder="First Name..."/>
                                </Form.Group>
                                <Form.Group>
                                <MyTextInput label="Last Name"
                                           name="lastName"
                                           type="text"
                                           placeholder="Last Name...."/>
                                </Form.Group>
                                <Form.Group>
								<MyTextInput label="Email"
                                           name="email"
                                           type="text"
                                           placeholder="email..."/>
                                </Form.Group>
                                <Form.Group>
								<MyTextInput label="Phone Number"
                                           name="phone"
                                           type="text"
                                           placeholder="Phone Number...."/>
                                </Form.Group>
                                <Form.Group>
							    <MySelectInput label="Level Of Education" name="levelOfEducation">
                                    <option value="">Select a level of Education..</option>
                                    <option value="POST_GRADUATE">UI Engineer</option>
                                    <option value="GRADUATE">API Engineer</option>
                                    <option value="UNDER_GRADUATE_STUDENT">DevOps_Engineer</option>
                                    <option value="HIGHSCHOOL">Data Engineer</option>
                                </MySelectInput>
                                </Form.Group>
                                <Form.Group>
								<MyTextInput label="Years of Experience"
                                           name="yearsOfExperience"
                                           type="text"
                                           placeholder="Years of experience...."/>
                                 </Form.Group>
                                 <Form.Group>
                           <MyStyledButton variant="primary" type="submit"
                             disabled={isSubmitting}>Save</MyStyledButton>
                           <MyStyledButton variant="danger" type="button"
                              disabled={false}
                              onClick={props.deleteApplicant(props.applicant.applicantId)}>Delete</MyStyledButton>
                            </Form.Group>
                       </MyStyledForm>
                   )}
                   </Formik>
        </MyStyledContainer>
    );
}

JobApplicantUpdateForm.propTypes={
    updateApplicant: PropTypes.func.isRequired,
    applicant: PropTypes.object.isRequired,
    deleteApplicant: PropTypes.func.isRequired,
}
export default JobApplicantUpdateForm;