
 import validator from "validator";


const validate =(data)=>{
    const mandatoryFiels = ['firstName','emailID','password'];
    const IsAllowed = mandatoryFiels.every((k)=>Object.keys(data).includes(k));

    if(!IsAllowed){
        throw new Error("some Field is missing");
    }
    if(!validator.isEmail(data.emailID)){
        throw new Error("Something is wrong with the Email")
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Make Password more stronger")
    };
}
export default validate;