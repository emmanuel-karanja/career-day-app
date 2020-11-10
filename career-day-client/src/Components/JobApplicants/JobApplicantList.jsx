import React,{Component} from 'react';
import {jobApplicantApi} from '../../API';
import JobApplicantTable from './JobApplicantTable'

class JobApplicantList extends Component{
   static async fetchApplicants(){
       const data=await jobApplicantApi.fetchAllAppicants();
       return data;
   }

   constructor(){
       super();
        this.state={
            applicants,
        };

        this.createApplicant=this.createApplicant.bind(this);
        this.deleteApplicant=this.deleteApplicant.bind(this);
        this.updateApplicant=this.updateApplicant.bind(this);
      }

      componentDidMount(){
          const {applicants}=this.state;
          if(jobs==null) this.loadData();
      }
      async loadData(){
          const data=await JobApplicantList.fetchApplicants();
          if(data){
              this.setState({
                  applicants:data
              });
          }
      }

      deleteJob(id){
         await jobApplicantApi.deleteApplicant(id);
         const newApplicants=await jobApplicantApi.fetchAllApplicants();
         this.setState({applicants:newApplicants});
      }

      async createApplicant(newApplicant){
         await jobApplicantApi.createApplicant(newApplicant);
         const newApplicants=await jobApi.fetchAllApplicants();
         this.setState({applicants:newApplicants});
      }

      async updateApplicant(updatedApplicant){
          await jobApplicantApi.updateApplicant(updatedJob);
          const newApplicants=await jobApplicantApi.fetchAllApplicants();
          this.setState({applicantss:newApplicants});
      }

      render(){
          const{applicants}=this.state;
          return(
            <div>
               <JobApplicantTable applicants={applicants} deleteApplicant={this.deleteApplicant}/>
           </div>
          )
      }
}