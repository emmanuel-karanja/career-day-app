import React from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';
import {parseDateString,isSameOrBefore} from '../../Utils/dateUtils';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import history from '../../Utils/history';

import {MyTextInput,
        MyStyledButton,
        MyStyledContainer,
        MyStyledForm,
        MySelectInput,   
        StyledLabel 
  } from '../Common/MyFormComponents';

const today=new Date();
       
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
   jobType: Yup.string()
              .oneOf(['UI_ENGINEER','API_ENGINEER','DEVOPS_ENGINEER','DATA_ENGINEER','AUTOMATION_ENGINEER','QA_ENGINEER']
              ,"*Invalid job type")
              .required("*Job Type is required"),
   interviewDate: Yup.date("* Job Interview date must be a valid date")
              .transform(parseDateString).min(today)
              .required("*Interview Date is required"),
   levelOfEducation: Yup.string()
              .oneOf(['POST_GRADUATE','GRADUATE','UNDER_GRADUATE_STUDENT','HIGH_SCHOOL']
              ,"*Invalid level of education type")
              .required("*Job level of education is required"),
    status: Yup.string()
              .oneOf(['ACTIVE','SUSPENDED','CANCELLED','EXPIRED']
              ,"*Invalid Job Status type")
              .required("*Job Status is required"),
    startTime: Yup.string()
              .test(
                'not empty',
                'Start time cant be empty',
                function(value) {
                  return !!value;
                }
              )
              .test(
                "",
                "Start time must be before end time",
                function(value) {
                  const { endTime } = this.parent;
                  return isSameOrBefore(value, endTime);
                }
              )
              .default('09:00'),
    endTime: Yup.string().default('17:00')
    
});

const JobUpdateForm=(props)=>{
    return(
        <MyStyledContainer fluid>
            <Formik 
               initialValues={{name:props.job.name, 
                               description:props.job.description,
							                 summary:props.job.summary,
							                interviewDate:props.job.interviewOn,
							                levelOfEducation:props.job.levelOfEducation,
							                status: props.job.status,
							                type: props.job.type,
                               startTime: props.job.StartTime,
                               endTime:props.job.EndTime,
                               }}
               validationSchema={JobUpdateSchema}
               onSubmit={(values, {setSubmitting, resetForm})=>{
                   setSubmitting(true);
                       
                       const updatedJob={id: props.job.jobId,...values};
					   
                       props.updateJob(updatedJob);
                       resetForm();
                       setSubmitting(false);
                       history.push("/adminjobpage");


               }}
               >
                   {({handleSubmit, isSubmitting,setFieldValue,values})=>(
                       <MyStyledForm onSubmit={handleSubmit} className="mx-auto"> 
                               <Form.Group>  
                               <MyTextInput label="Job Title"
                                          name="name"
                                          type="text"
                                          placeholder="Job Title..."/>
                                </Form.Group>
                                <Form.Group>
                                <MyTextInput label="Job Description"
                                           name="description"
                                           as="textarea"
                                           rows="8"
                                           placeholder="Job Description...."/>
                                </Form.Group>
                                <Form.Group>
								<MyTextInput label="Job Summary"
                                           name="summary"
                                           type="text"
                                           placeholder="Job Summary...."/>
                                </Form.Group>
                                <Form.Group>
							    <MySelectInput label="Job Type" name="jobType">
                                    <option value="">Select a Job Type..</option>
                                    <option value="UI_ENGINEER">UI Engineer</option>
                                    <option value="API_ENGINEER">API Engineer</option>
                                    <option value="DEVOPS_ENGINEER">DevOps_Engineer</option>
                                    <option value="DATA_ENGINEER">Data Engineer</option>
								                  	<option value="QA_ENGINEER">QA Engineer</option>
                                    <option value="AUTOMATION_ENGINEER">Automation Engineer</option>
                                </MySelectInput>
                                </Form.Group>
                                <Form.Group>
                                <StyledLabel>Interview Date</StyledLabel>
								<DatePicker 
                                  selected={values.interviewDate}
                                  dateFormat="MMMM d, yyyy"
                                  className="form-control"
                                  name="interviewDate"
                                  onChange={date => setFieldValue('interviewDate', date)}
                                />
                                <Form.Group>
								<MyTextInput label="Interview StartTime"
                                           name="startTime"
                                           type="text"
                                           placeholder="Interview StartTime...."/>
                                </Form.Group>
                                <Form.Group>
                                <MyTextInput label="Interview EndTime"
                                           name="endTime"
                                           type="text"
                                           placeholder="Interview EndTime...."/>
                                </Form.Group>
                                 </Form.Group>
                                 <Form.Group>
							    <MySelectInput label="Level Of Education" name="levelOfEducation">
                                    <option value="">Select A Level of Education</option>
                                    <option value="POST_GRADUATE">Post-Graduate</option>
                                    <option value="GRADUATE">Graduate</option>
                                    <option value="UNDER_GRADUATE_STUDENT">Under-Graduate Student</option>
                                    <option value="HIGH_SCHOOL">High School</option>
                                </MySelectInput>
                                </Form.Group>
                                <Form.Group>
								<MySelectInput label="Job Status" name="status">
                                    <option value="ACTIVE">Active</option>
                                    <option value="SUSPENDED">Suspended</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="EXPIRED">Expired</option>
                                </MySelectInput> 
                                </Form.Group>
                                <Form.Group>
                           <MyStyledButton variant="primary" type="submit"
                             disabled={isSubmitting}>Save</MyStyledButton>
                              </Form.Group>
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