import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>

            <p style={{'textAlign': 'center', 'fontWeight': 900 , 'fontSize': 24, 'marginTop': 50}}>
                Page doesn't exist
            </p> 
            
            <Link to="/"
                style={{'textAlign': 'center', 'display': 'block', 'fontWeight': 900 , 'fontSize': 24, 'marginTop': 20, 'color': '#9f0013'}} >
            Back to main pages
            </Link>
        </div>
    )
};

export default Page404;