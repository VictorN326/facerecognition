import React from 'react';

const Navigation = ({onRouteChange, SignedIn}) => {
        if(SignedIn) {
        return(
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p  onClick={() => onRouteChange('SignOut')}  className = 'f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
        );
        } else {
         return(
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p  onClick={() => onRouteChange('SignInForm')}  className = 'f3 link dim black underline pa3 pointer'>Sign In</p>
                <p  onClick={() => onRouteChange('Register')}  className = 'f3 link dim black underline pa3 pointer'>Register</p>
            </nav>

            
            );
        }
        

}

export default Navigation; 