#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { spawn } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.join(__dirname, '..', 'template')

const projectName = process.argv[2] || 'my-roobar-app'
const targetDir = path.join(process.cwd(), projectName)

// Copy template files
fs.cpSync(templateDir, targetDir, { recursive: true })

// Update package.json name
const packageJsonPath = path.join(targetDir, 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
packageJson.name = projectName
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

console.log(`Created ${projectName}`)
console.log(`\nNext steps:`)
console.log(`  cd ${projectName}`)
console.log(`  npm install`)
console.log(`  npm run dev`)

// Optional: Auto-install dependencies
const shouldInstall = process.argv.includes('--install')
if (shouldInstall) {
  console.log('\nInstalling dependencies...')
  spawn('npm', ['install'], { cwd: targetDir, stdio: 'inherit' })
}