import React from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Form,Container,Button} from 'react-bootstrap';

import {MyTextInput,
        MyStyledButton,
        MyStyledContainer,
        MyStyledForm,
        MySelectInput,
        MyCheckBoxInput,
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
                   .min(1,'*Job years of experience must be at least 1 year')
				   .maz(40,'*Job years of experience must be at most 40 years'),
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
                   //do the submit here props.createProject(...)
                   setTimeout(()=>{
                       //alert(JSON.stringify(values,null,2));
                       //send the axios request here
            
                       props.updateApplicant(values);
                       resetForm();
                       setSubmitting(false);
                   },500);

               }}
               >
                   {({handleSubmit, isSubmitting})=>(
                       <MyStyledForm onSubmit={handleSubmit} className="mx-auto">   
                               <MyTextInput label="First Name"
                                          name="firstName"
                                          type="text"
                                          placeholder="First Name..."/>
                                <MyTextInput label="Last Name"
                                           name="lastName"
                                           type="text"
                                           placeholder="Last Name...."/>
								<MyTextInput label="Email"
                                           name="email"
                                           type="text"
                                           placeholder="email..."/>
								<MyTextInput label="Phone Number"
                                           name="phone"
                                           type="text"
                                           placeholder="Phone Number...."/>
							    <MySelectInput label="Level Of Education" name="levelOfEducation">
                                    <option value="POST_GRADUATE">UI Engineer</option>
                                    <option value="GRADUATE">API Engineer</option>
                                    <option value="UNDER_GRADUATE_STUDENT">DevOps_Engineer</option>
                                    <option value="HIGHSCHOOL">Data Engineer</option>
                                </MySelectInput>
								<MyTextInput label="Years of Experience"
                                           name="yearsOfExperience"
                                           type="text"
                                           placeholder="Years of experience...."/>
                           <MyStyledButton variant="primary" type="submit"
                             disabled={isSubmitting}>Save</MyStyledButton>
                           <MyStyledButton variant="danger" type="button"
                              disabled={false}
                              onClick={props.deleteApplicant(props.applicant.applicantId)}>Delete</MyStyledButton>
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