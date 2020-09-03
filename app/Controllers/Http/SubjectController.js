'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Subject = use('App/Models/Subject')

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: '${number}' is not supported, please use param as a number.`, }
    return {}
}

class SubjectController {
    async index({ request }) {
        //? //=subjects?references=teachers
        const { references = undefined } = request.qs

        const subject = Subject.query()

        if (references) {
            const extractedReferences = references.split(",")
            subjects.with(extractedReferences)
        }

        return { status: 200, error: undefined, data: await subject.fetch() };
    }

    async show({ request }) {
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined }

        const subject = await Subject.find(id)

        return { status: 200, error: undefined, data: subject || {} }
    }

    async store({ request }) {
        const { title, teacher_id } = request.body

        const rules = {
            title: 'required',
            teacher_id: 'required',
        }

        const Validation = await Validator.validateAll(request.body, rules)

        if (Validation.fails())
            return { status: 422, error: Validation.message(), data: undefined }

        const subject = new Subject()
        subject.title = title
        subject.teacher_id = teacher_id

        await subject.save()

        return { status: 200, error: undefined, data: subject }
    }

    async update({ request }) {
        
        const { body, params } = request
        const { id } = params
        const { title } = body
        const subject = await Subject.find(id)

        subject.merge({ title })

        await subject.save()

        return {
            status: 200,
            error: undefined,
            data: subject,
        }
    }

    async destroy({ request }) {
        const { id } = request.params

        await Database.table('subjects').where({ subject_id: id }).delete()

        return { status: 200, error: undefined, data: { message: 'success' } }
    }
}

module.exports = SubjectController