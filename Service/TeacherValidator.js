const Validator = use ("Validator")

module0.export = function TeacherValidator (frist_name , last_name , email , password){
    const rules = {
        first_name: 'required',
        last_name: 'required',
        password: 'required|email|unique:teachers',
        email: 'required|min:8'
    }
    const Validation = await Validator.validateAll({
        frist_name , last_name , email , password
}, rules)




return {
    error : undefined
}
}