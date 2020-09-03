'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Enrollment = use("App/Models/Enrollment")

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, Please use number type param.` }
    return {}
}

class EnrollmentController {
    async index({ request }) {
        const { references } = request.qs

        const enrollments = Enrollment.query()

        if (references) {
            const extractedReferences = references.split(",");
            extractedReferences.forEach((value) => {
                enrollments.with(value)
            })
        }

        return { status: 200, error: undefined, data: enrollments.fetch() }
    }

    async show({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined }

        const enrollment = await Enrollment.find(id)

        return { status: 200, error: undefined, data: group || {} }
    }

    async store({ request }) {
        const { mark, mark_id, student_id, subject_id } = request.body

        const rules = {
            mark: "required",
            student_id: "required",
            subject_id: "required",
        }

        const Validation = await Validator.validateAll(request.body, rules)

        if (Validation.fails())
            return { status: 422, error: Validation.message(), data: undefined }

            const enrollment = new Enrollment();
            enrollment.mark = mark;
            enrollment.student_id = student_id;
            enrollment.subject_id = subject_id;
        
            await enrollment.save();

        return { status: 200, error: undefined, data: enrollment }
    }

    async update({ request }) {
        
        const { body, params } = request
        const { id } = params
        const { mark } = body
        const enrollment = await Enrollment.find(id)
    
        enrollment.merge({ mark })
    
        await enrollment.save()
    
        return { status: 200, error: undefined, data: enrollment, }
      }
    
      async destroy({ request }) {
        const { id } = request.params
    
        await Database.table("enrollments").where({ enrollment_id: id }).delete()
    
        return { status: 200, error: undefined, data: { message: "success" } }
      }
}

module.exports = EnrollmentController