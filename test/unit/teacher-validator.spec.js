'use strict'

const { test } = use('Test/Suite')('Teacher Validator')
const teacherValidator = require('../../Service/TeacherValidator')


test('should return error when pass incorrect data', async ({ assert }) => {
  const validatorData = TeacherValidator("john","Doe","wrong email", "123456" )
  assert.equal(typeof validatorData, "string")

})
test('should return error when pass incorrect data', async ({ assert }) => {
  const validatorData = TeacherValidator("john","Doe","wrong email", "123456" )
  assert.equal(typeof validatorData, "undefined")

})