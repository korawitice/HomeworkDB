'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Hash = use('Hash')
const Student = use('App/Models/Student')

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: '${number}' is not supported, please use param as a number.`, }
    return {}
}

class StudentController {
    async index({ request }) {
        const { references } = request.qs
        const students = Student.query()

        if (references) {
            const extractedReferences = references.split(",")
            students.with(extractedReferences)
        }

        return { status: 200, error: undefined, data: await students.fetch() }
    }

    async show({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined }

        const student = await Student.find(id)

        return { status: 200, error: undefined, data: student || {} }
    }

    async store({ request }) {
        const { first_name, last_name, password, email, group_id } = request.body

        const rules = {
            first_name: "required",
            last_name: "required",
            email: "required|email|unique:students,email",
            password: "required|min:8",
            group_id: "required",
        };

        const Validation = await Validator.validateAll(request.body, rules)

        if (Validation.fails())
            return { status: 422, error: Validation.message(), data: undefined }

        const hashedPassword = await Hash.make(password)

        const student = new Student()
        student.first_name = first_name
        student.last_name = last_name
        student.email = email
        student.password = hashedPassword
        student.group_id = group_id

        await student.save()

        return { status: 200, error: undefined, data: student }
    }

    async update({ request }) {
        
        const { body, params } = request
        const { id } = params
        const { first_name, last_name, email, group_id } = body
        const student = await Student.find(id)

        student.merge({ first_name, last_name, email, group_id })

        await student.save()

        return {
            status: 200,
            error: undefined,
            data: student,
        }
    }

    async destroy({ request }) {
        const { id } = request.params

        await Database.table("students").where({ student_id: id }).delete()

        return { status: 200, error: undefined, data: { message: "success" } }
    }
}

module.exports = StudentController