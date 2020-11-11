import React from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';
import {parseDateString,isSameOrBefore} from '../../Utils/dateUtils';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import {MyTextInput,
        MyStyledButton,
        MyStyledContainer,
        MyStyledForm,
        MySelectInput,
        StyledLabel
  } from '../Common/MyFormComponents';


const today=new Date();    
const jobCreateSchema=Yup.object().shape({
   name: Yup.string()
             .min(10,"*Job Title must be at least 10 characters long")
			 .max(100, "*Names can't be longer than 100 characters")
             .required('*Job Title is required'),
   description: Yup.string()
                   .min(20,'*Job Description must be at least 20 characters long')
                   .required('*Job Description is required'),
   summary:Yup.string()
             .min(10,"*Job Summary must be at least 5 characters long")
             .max(200,"*Write a shorter summary")
             .required('*Job Summary is required'),
   type: Yup.string()
              .oneOf(['UI_Engineer','API_Engineer','DevOps_Engineer','Data_Engineer','Automation_Engineer','QA_Engineer']
              ,"*Invalid job type")
              .required("*Job Type is required"),
   interviewDate: Yup.date("* Job Interview date must be a valid date")
                     .transform(parseDateString).min(today)
                     .default(()=>{new Date();})
                     .required("*Interview Date is required"),
   levelOfEducation: Yup.string()
              .oneOf(['POST_GRADUATE','GRADUATE','UNDER_GRADUATE_STUDENT','HIGHSCHOOL']
              ,"*Invalid level of education type")
              .required("*Job level of education is required"),
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

const JobCreateForm=(props)=>{
    return(
        <MyStyledContainer fluid>
            <Formik 
               initialValues={{name:"", 
                               description:"",
							   summary:"",
							   interviewDate:today,
							   levelOfEducation:"",
                               startTime:"09:00",
                               endTime:"17:00",
                               }}
               validationSchema={jobCreateSchema}
               onSubmit={(values, {setSubmitting, resetForm})=>{
                   setSubmitting(true);
                       //alert(JSON.stringify(values,null,2));
                       //send the axios request here
                       props.createJob(values);
                       resetForm();
                       setSubmitting(false);
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
                                           type="textarea"
                                           placeholder="Job Description...."/>
                                </Form.Group>
                                <Form.Group>
								<MyTextInput label="Job Summary"
                                           name="summary"
                                           type="text"
                                           placeholder="Job Summary...."/>
                                </Form.Group>
                                <Form.Group>
							    <MySelectInput label="Job Type" name="type">
                                    <option value="UI_Engineer">UI Engineer</option>
                                    <option value="API_Engineer">API Engineer</option>
                                    <option value="DevOps_Engineer">DevOps_Engineer</option>
                                    <option value="Data_Engineer">Data Engineer</option>
									<option value="QA_Engineer">QA Engineer</option>
                                    <option value="Automation_Engineer">Automation Engineer</option>
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
                                </Form.Group>
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
                                <Form.Group>
							    <MySelectInput label="Level Of Education" name="levelOfEducation">
                                    <option value="POST_GRADUATE">Post-Graduate</option>
                                    <option value="GRADUATE">Graduate</option>
                                    <option value="UNDER_GRADUATE_STUDENT">Under-Graduate Student</option>
                                    <option value="HIGHSCHOOL">High School</option>
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

JobCreateForm.propTypes={
    createJob: PropTypes.func.isRequired,
}
export default JobCreateForm;