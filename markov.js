/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/)
    this.words = words.filter(c => c !== '')
    this.chain = {}
    this.makeChains()
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let words = this.words
    let chain = this.chain

    // Generate object with words
    for (let i = 0; i < words.length; i++) {
      if (!(words[i] in chain)) {
        chain[words[i]] = []
      }
      chain[words[i]].push(words[i + 1])
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let words = this.words
    let chain = this.chain

    const randStartIndex = Math.floor(Math.random() * words.length)
    let firstWord = words[randStartIndex]

    let generatedText = []
    generatedText.push(firstWord)

    while (generatedText.length < numWords) {
      const lastWord = generatedText[generatedText.length - 1]

      const randomIdx = Math.floor(
        Math.random() * chain[lastWord].length
      )

      const nextWord = chain[lastWord][randomIdx]
      if (nextWord) {
        generatedText.push(nextWord)
      } else {
        break
      }
    }

    console.log(generatedText.join(' '))
  }
}

module.exports = {
  MarkovMachine
}
