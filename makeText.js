const axios = require('axios')
const fs = require('fs')
const process = require('process')
const { MarkovMachine } = require('./markov')

const param = process.argv[2]
const target = process.argv[3]

function textGenerator(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err)
      process.exit(1)
    } else {
      let mm = new MarkovMachine(data)
      mm.makeText()
    }
  })
}

async function urlGenerator(url) {
  try {
    let res = await axios.get(url)
    let mm = new MarkovMachine(res.data)
    mm.makeText()
  } catch (err) {
    console.log('Error: ', err.message)
    process.exit(1)
  }
}

if (param === 'file') {
  textGenerator(target)
} else if (param === 'url') {
  urlGenerator(target)
}
