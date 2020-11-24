import { MOST_POPULAR_WORDS } from './config.js'

chrome.storage.local.get("allPageText", function(data) {
  let allPageText = data.allPageText
  let wordCountBlock = document.querySelector('.wordCountBlock')
  let uniqueWordCountBlock = document.querySelector('.wordCountBlock.unique')
  let graphActiveBlock = document.querySelector('.graphActiveBlock')

  wordCountBlock.innerText = `Number of words: ${countWords(allPageText)}`
  uniqueWordCountBlock.innerText = `Number of unique words: ${countUniqueWords(allPageText)}`
  graphActiveBlock.style.height = `${getTextPopularity(allPageText)}%`
})

function getTextPopularity(text) {
  let mostPopularWordsList = MOST_POPULAR_WORDS.split(',')
  let numberOfPopularWords = 0
  let uniqueWordsList = getUniqueWords(text)

  mostPopularWordsList.forEach(popularWord => {
    if(uniqueWordsList.includes(popularWord)) {
      numberOfPopularWords++
    }
  })
  let percentOfPopularWords = Math.round((numberOfPopularWords / mostPopularWordsList.length) * 100)
  return percentOfPopularWords
}

function getAllWords(text) {
  let wordsList = text.split(' ')
  return wordsList
}

function countWords(text) {
  let wordsNumber = getAllWords(text).length
  return wordsNumber
}

function getUniqueWords(text) {
  let uniqueWordsList = []
  let wordsList = getAllWords(text)

  wordsList.forEach(word => {
    if(!uniqueWordsList.includes(word)) {
      uniqueWordsList.push(word)
    }
  });

  return uniqueWordsList
}

function countUniqueWords(text) {
  let uniqueWordsNumber = getUniqueWords(text).length
  return uniqueWordsNumber
}