import React,{Component} from 'react';
import {jobApi} from '../../API';
import JobTable from './JobTable'

class JobList extends Component{
   static async fetchJobs(){
       const data=await jobApi.fetchAllJobs();
       return data;
   }

   constructor(){
       super();
        this.state={
            jobs,
        };

        this.createJob=this.createJob.bind(this);
        this.deleteJob=this.deleteJob.bind(this);
        this.updateJob=this.updateJob.bind(this);
      }

      componentDidMount(){
          const {jobs}=this.state;
          if(jobs==null) this.loadData();
      }
      async loadData(){
          const data=await JobList.fetchJobs();
          if(data){
              this.setState({
                  jobs:data
              });
          }
      }

      deleteJob(id){
         await jobApi.deleteJob(id);
         const newJobs=await jobApi.fetchAllJobs();
         this.setState({jobs:newJobs});
      }

      async createJob(newJob){
         await jobApi.createJob(newJob);
         const newJobs=await jobApi.fetchAllJobs();
         this.setState({jobs:newJobs});
      }

      async updateJob(updatedJob){
          await jobApi.updateJob(updatedJob);
          const newJobs=await jobApi.fetchAllJobs();
          this.setState({jobs:newJobs});
      }

      render(){
          const{jobs}=this.state;
          return(
            <div>
               <JobTable jobs={jobs} deleteJob={this.deleteJob}/>
           </div>
          )
      }
}