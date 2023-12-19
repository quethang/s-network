function valid({fullName, email, password, cfPassword}){
    const error = {};
    
    if(!fullName) {
        error.fullName = 'Please enter your full name.';
    // } else if(!validateFullname(fullName)){
    //     error.fullName = 'Full name must be have 2 words.';
    } else if(fullName.length > 50){
        error.fullName = 'Full name must be less than 50 characters.';
    } 

    if(!email) {
        error.email = 'Please enter your email';
    } else if(!validateEmail(email)){
        error.email = 'Please enter the correct email format.';
    }

    if(!password) {
        error.password = 'Please enter your password.';
    } else if(password.length < 6){
        error.password = 'Password must be at least 6 characters.';
    }

    if(!cfPassword) {
        error.cfPassword = 'Please enter your confirm password.';
    } else if(cfPassword !== password){
        error.cfPassword = 'Confirm password must be the same as password.';
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length //trả về độ dài mảng các property name của object error
    }
}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid;