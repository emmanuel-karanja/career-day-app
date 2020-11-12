
import {Link} from 'react-router-dom';
const RegistrationSuccess=(props)=>{
	
	return(
	   <div>
		   <h2>Congratulations!</h2>
		   <p>You have successfully registered please follow <Link to="/login">this link</Link>
		   to login</p>
	   </div>
	 );
}

export default RegistrationSuccess;