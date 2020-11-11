import React from 'react';
import {useField} from 'formik';
import styled from 'styled-components';
import {Form,Button,Container,Row,Col} from 'react-bootstrap';

export const StyledLabel=styled(Form.Label)`
    color: #24B9B6;
    font-size: 1.2em;
     font-weight: 400;
`;



export const StyledTextInput=styled.input`
   border: 1px solid #E0E0E0;
   border-radius: 3px;
   padding: 10px;
   box-sizing: border-box;
   display: block;
   font-size:1.0em
`;

const StyledErrorMessage=styled.div`
  color: #FF6565;
  padding:.05em .02em;
  height:1em;
  position:absolute;
  font-size: 1.0em;
`;


export const MyStyledContainer=styled(Container)` 
  label {
      color: #24B9B6;
      font-size:1.2em;
      font-weight:400;
      padding:5px;
  }

  h1{
      color:#24B9B6;
      padding-top:0.5em;
  }

  .form-group{
      margin-bottom: 1.8em;
  }

  .error{
      border: 2px solid #FF6565;
  }

  .valid{
      border:2px solid #65FF65;
  }
  .untouched{
      border: 2px solid #656565;
  }
 }

 checkbox{
     font-size:1.2em;
     height:1.2em
 }
  
  `;

  export const MyStyledForm=styled(Form)`
     width: 90%;
     text-align: left;
     padding-top: 2em;
     padding-bottom: 2em;

    @media(min-width: 786px) {
    width: 50%;
   }
`;

 export const MyStyledButton=styled(Button)`
     background: #1863AB;
     border: none;
     font-size: 1.2em;
     font-weight: 400;

    &:hover {
    background: #1D3461;
  }
`;

export const MyTextInput=({label,...props})=>{
    const[field,meta]=useField(props);
    return(
        <Form.Row>
        <Form.Group as ={Col}>
        <StyledLabel  htmlFor={props.id || props.name}>{label}</StyledLabel>
        
        <Form.Control className= {meta.touched && meta.error ? "error":
                                  meta.touched && !meta.error? "valid": "untouched"} 
                                  {...field}{...props}/>
        {meta.touched && meta.error? (
            <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ): null }
        </Form.Group>
        </Form.Row>
    
    );
  };

export const MyCheckBoxInput=({children,...props})=>{
    const[field,meta]=useField({...props, type: 'checkbox'});
    return(
        <>
        <Form.Label className="checkbox">
            <Form.Control type="checkbox" {...field}{...props}/>
            {children}
        </Form.Label>
        {meta.touched && meta.error? (
            <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ): null}
        </>
    );
};

export const MySelectInput=({label,...props})=>{
    const[field,meta]=useField(props);
    return(
        <>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <Form.Control as="select" {...field}{...props}/>
        {meta.touched && meta.error?(
            <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ): null}
        </>
    )
}