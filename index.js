#!/usr/bin/env node
const chalk = require('chalk')
const dasherize = require('dasherize')
const figures = require('figures')
const fs = require('fs')
const inquirer = require('inquirer')
const Mustache = require('mustache')
const path = require('path')
const gitConfigSync = require('parse-git-config').sync

require('yargs')
  .usage('$0 <command> [options]')
  .command('generate', 'create a new npm or npm Enterprise add-on', function (yargs) {
    return yargs
  }, function (argv) {
    generateFiles()
  })
  .version()
  .help()
  .alias('h', 'help')
  .demand(1, 'you must provide a command to run')
  .argv

function generateFiles () {
  console.info(chalk.bold('1.') + ' answer some questions about your add-on:')
  inquirer.prompt([
    {type: 'list', name: 'type', message: 'application type', choices: ['badge plus']},
    {name: 'email', message: 'email address for your integration', validate: validateEmail},
    {name: 'name', message: 'name for integration'},
    {name: 'homepage', message: 'integration homepage', validate: validateUrl},
    {name: 'description', message: 'short description of integration'},
    {name: 'callback', message: 'OAuth 2.0 callback URL', validate: validateUrl},
    {name: 'webhook', message: 'URL to post webhooks to', validate: validateUrl}
  ]).then(function (answers) {
    fs.writeFileSync(
      path.resolve(process.cwd(), './index.json'),
      JSON.stringify(answers, null, 2),
      'utf-8'
    )
    console.info(chalk.green(figures.tick) + ' generated ' + chalk.bold('index.json'))
    writePkgJson(answers)
  })
}

function writePkgJson (answers) {
  var config = gitConfigSync(
    path.resolve(process.cwd(), './.git/config')
  )
  var gitUrl = config['remote "origin"'] || 'git+https://github.com/npm/npmi-cli.git'
  var template = fs.readFileSync(
    path.resolve(__dirname, './pkg.mustache'),
    'utf-8'
  )
  fs.writeFileSync(
    path.resolve(process.cwd(), './package.json'),
    Mustache.render(template, {
      description: answers.description,
      name: dasherize(answers.name).replace(/ /g, ''),
      gitUrl: gitUrl
    }),
    'utf-8'
  )
  console.info(chalk.green(figures.tick) + ' generated ' + chalk.bold('package.json'))
}

function validateUrl (str) {
  if (!/^https?:\/\/.+$/.test(str)) {
    return Error('must be fully qualified URL')
  } else {
    return true
  }
}

function validateEmail (str) {
  if (!/^.+@.+$/.test(str)) {
    return Error('must be valid email address')
  } else {
    return true
  }
}
