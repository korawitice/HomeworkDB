'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Group = use("App/Models/Group")

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, Please use number type param.` }
    return {}
}

class GroupController {
    async index({ request }) {
        const { references } = request.qs;
        const groups = Group.query();

        if (references) {
            const extractedReferences = references.split(",");
            groups.with(extractedReferences);
        }

        return { status: 200, error: undefined, data: await groups.fetch() }
    }

    async show({ request }) {
        const { id } = request.params

        const ValidateValue = numberTypeParamValidator(id)

        if (ValidateValue.error)
            return { status: 500, error: validateValue.error, data: undefined }

        const group = await Group.find(id)

        return { status: 200, error: undefined, data: group || {} }
    }

    async store({ request }) {
        const { name } = request.body

        const rules = {
            name: "required|unique:groups,name",
        }

        const Validation = await Validator.validateAll(request.body, rules)

        if (Validation.fails())
            return { status: 422, error: Validation.message(), data: undefined }

            const group = new Group();
            group.name = name;
        
            await group.save();

        return { status: 200, error: undefined, data: { name } }
    }

    async update({ request }) {
        
        const { body, params } = request
        const { id } = params
        const { name } = body
        const group = await Group.find(id)
    
        group.merge({ name })
    
        await group.save()
    
        return { status: 200, error: undefined, data: group }
      }
    
      async destroy({ request }) {
        const { id } = request.params
    
        await Database.table("groups").where({ group_id: id }).delete()
    
        return { status: 200, error: undefined, data: { message: "success" } }
      }
}

module.exports = GroupController