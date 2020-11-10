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


       
const JobUpdateSchema=Yup.object().shape({
   name: Yup.string()
             .min(10,"*Job Title must be at least 10 characters long")
			 .max(100, "*Names can't be longer than 100 characters")
             .required('*Job Title is required'),
   description: Yup.string()
                   .min(200,'*Job Description must be at least 200 characters long')
                   .required('*Job Description is required'),
   summary:Yup.string()
             .min(50,"*Job Summary must be at least 5 characters long")
             .required('*Job Summary is required'),
   type: Yup.string()
              .oneOf(['UI_Engineer','API_Engineer','DevOps_Engineer','Data_Engineer','Automation_Engineer','QA_Engineer']
              ,"*Invalid job type")
              .required("*Job Type is required"),
   interviewAt: Yup.date("* Job Interview date must be a valid date")
                   .required("*Job interview date is required"),
   levelOfEducation: Yup.string()
              .oneOf(['POST_GRADUATE','GRADUATE','UNDER_GRADUATE_STUDENT','HIGHSCHOOL']
              ,"*Invalid level of education type")
              .required("*Job level of education is required"),
   yearsOfExperience : Yup.number()
                   .min(1,'*Job years of experience must be at least 1 year')
				   .maz(40,'*Job years of experience must be at most 40 years'),
    status: Yup.string()
              .oneOf(['ACTIVE','SUSPENDED','CANCELLED','EXPIRED']
              ,"*Invalid Job Status type")
              .required("*Job Status is required"),
});

const JobUpdateForm=(props)=>{
    return(
        <MyStyledContainer fluid>
            <Formik 
               initialValues={{name:props.job.name, 
                               description:props.job.description,
							   summary:props.job.summary,
							   interviewAt:props.job.interviewDate,
							   levelOfEducation:props.job.levelOfEducation,
							   status: props.job.status,
							   type: props.job.type,
							   yearsOfExperience: props.job.experience,
                               }}
               validationSchema={JobUpdateSchema}
               onSubmit={(values, {setSubmitting, resetForm})=>{
                   setSubmitting(true);
                   //do the submit here props.createProject(...)
                   setTimeout(()=>{
                       //alert(JSON.stringify(values,null,2));
                       //send the axios request here
                       props.updateJob(values);
                       resetForm();
                       setSubmitting(false);
                   },500);

               }}
               >
                   {({handleSubmit, isSubmitting})=>(
                       <MyStyledForm onSubmit={handleSubmit} className="mx-auto">   
                               <MyTextInput label="Job Title"
                                          name="name"
                                          type="text"
                                          placeholder="Job Title..."/>
                                <MyTextInput label="Job Description"
                                           name="description"
                                           type="text-area"
                                           placeholder="Job Description...."/>
								<MyTextInput label="Job Summary"
                                           name="summary"
                                           type="text"
                                           placeholder="Job Summary...."/>
							    <MySelectInput label="Job Type" name="type">
                                    <option value="UI_Engineer">UI Engineer</option>
                                    <option value="API_Engineer">API Engineer</option>
                                    <option value="DevOps_Engineer">DevOps_Engineer</option>
                                    <option value="Data_Engineer">Data Engineer</option>
									<option value="QA_Engineer">QA Engineer</option>
                                    <option value="Automation_Engineer">Automation Engineer</option>
                                </MySelectInput>
								<MyTextInput label="Job Interview Date"
                                           name="interviewAt"
                                           type="text"
                                           placeholder="Job Interview Date...."/>
							    <MySelectInput label="Level Of Education" name="levelOfEducation">
                                    <option value="POST_GRADUATE">Post-Graduate</option>
                                    <option value="GRADUATE">Graduate</option>
                                    <option value="UNDER_GRADUATE_STUDENT">Under-Graduate Student</option>
                                    <option value="HIGHSCHOOL">High School Certificate</option>
                                </MySelectInput>
								<MySelectInput label="Job Status" name="status">
                                    <option value="ACTIVE">Active</option>
                                    <option value="SUSPENDED">Suspended</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="EXPIRED">Expired</option>
                                </MySelectInput>                
								<MyTextInput label="Years of Experience"
                                           name="yearsOfExperience"
                                           type="text"
                                           placeholder="Years of experience...."/>
                           <MyStyledButton variant="primary" type="submit"
                             disabled={isSubmitting}>Save</MyStyledButton>
                            <MyStyledButton variant="danger" type="button"
                              disabled={false}
                              onClick={props.deleteJob(props.job.jobId)}>Delete</MyStyledButton>
                       </MyStyledForm>
                   )}
                   </Formik>
        </MyStyledContainer>
    );
}

JobUpdateForm.propTypes={
    updateJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    deleteJob: PropTypes.func.isRequired,
}
export default JobUpdateForm;