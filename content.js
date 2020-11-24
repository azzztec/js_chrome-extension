let mostPopularWordsList = []

document.body.onload = function() {
  chrome.storage.sync.get('mostPopularWords', function(result) {
    mostPopularWordsList = result.mostPopularWords.split(',')
  })
}

chrome.runtime.onMessage.addListener(function(response) {
  let selectedText = response.selectedText
  createStatisticPopup(selectedText)
})

function getTextPopularity(text) {
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

function createStatisticPopup(text) {
  let popupBlock = document.createElement('div')
  let textContainer = document.createElement('div')
  let wordCountBlock = document.createElement('p')
  let uniqueWordCountBlock = document.createElement('p')
  let graphContainer = document.createElement('div')
  let graphBlock = document.createElement('div')
  let graphActiveBlock = document.createElement('div')
  let closeBtn = document.createElement('button')


  wordCountBlock.innerText = `Number of words: ${countWords(text)}`
  wordCountBlock.classList.add('wordCountBlock')

  uniqueWordCountBlock.innerText = `Number of unique words: ${countUniqueWords(text)}`
  uniqueWordCountBlock.classList.add('wordCountBlock')
  uniqueWordCountBlock.classList.add('unique')

  graphContainer.classList.add('graphContainer')
  graphBlock.classList.add('graphBlock')
  graphActiveBlock.classList.add('graphActiveBlock')
  graphActiveBlock.style.height = `${getTextPopularity(text)}%`

  closeBtn.classList.add('closeBtn')
  closeBtn.innerText = 'X'
  closeBtn.onclick = function() {
    popupBlock.remove()
  }

  popupBlock.classList.add('showStatisticPopup')

  document.body.prepend(popupBlock)

  popupBlock.prepend(closeBtn)

  textContainer.append(wordCountBlock)
  textContainer.append(uniqueWordCountBlock)
  popupBlock.append(textContainer)

  popupBlock.append(graphContainer)
  graphContainer.append(graphBlock)
  graphBlock.append(graphActiveBlock)
}
