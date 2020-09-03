'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTeacherSchema extends Schema {
  up () {
    this.create('teachers', (table) => {
      table.increments('teacher_id')
      table.string('firs_tname',120).notNullable()
      table.string('last_name',120).notNullable()
      table.string('email',255).unique().notNullable()
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('teachers')
  }
}

module.exports = CreateTeacherSchema
