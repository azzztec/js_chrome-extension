chrome.runtime.onMessage.addListener(function(response) {
  let selectedText = response.selectedText
  createStatisticPopup(countWords(selectedText), countUniqueWords(selectedText))
})

function countWords(text) {
  let wordsNumber = text.split(' ').length
  return wordsNumber
}

function countUniqueWords(text) {
  let uniqueWordsList = []
  let wordsList = text.split(' ')

  wordsList.forEach(word => {
    if(!uniqueWordsList.includes(word)) {
      uniqueWordsList.push(word)
    }
  });

  let uniqueWordsNumber = uniqueWordsList.length
  return uniqueWordsNumber
}

function createStatisticPopup(wordsNumber, uniqueWordsNumber) {
  let popupBlock = document.createElement('div')
  let textContainer = document.createElement('div')
  let wordCountBlock = document.createElement('p')
  let uniqueWordCountBlock = document.createElement('p')
  let graphContainer = document.createElement('div')
  let graphBlock = document.createElement('div')
  let graphActiveBlock = document.createElement('div')
  let closeBtn = document.createElement('button')


  wordCountBlock.innerText = `Number of words: ${wordsNumber}`
  wordCountBlock.classList.add('wordCountBlock')

  uniqueWordCountBlock.innerText = `Number of unique words: ${uniqueWordsNumber}`
  uniqueWordCountBlock.classList.add('wordCountBlock')
  uniqueWordCountBlock.classList.add('unique')

  graphContainer.classList.add('graphContainer')
  graphBlock.classList.add('graphBlock')
  graphActiveBlock.classList.add('graphActiveBlock')

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
