chrome.runtime.onMessage.addListener(function(response) {
  createStatisticPopup()
})

function createStatisticPopup() {
  let popupBlock = document.createElement('div')
  let textContainer = document.createElement('div')
  let wordCountBlock = document.createElement('p')
  let uniqueWordCountBlock = document.createElement('p')
  let graphContainer = document.createElement('div')
  let graphBlock = document.createElement('div')
  let graphActiveBlock = document.createElement('div')


  wordCountBlock.innerText = 'Number of words: '
  wordCountBlock.classList.add('wordCountBlock')

  uniqueWordCountBlock.innerText = 'Number of unique words: '
  uniqueWordCountBlock.classList.add('wordCountBlock')
  uniqueWordCountBlock.classList.add('unique')

  graphContainer.classList.add('graphContainer')
  graphBlock.classList.add('graphBlock')
  graphActiveBlock.classList.add('graphActiveBlock')

  popupBlock.classList.add('showStatisticPopup')

  document.body.prepend(popupBlock)

  textContainer.append(wordCountBlock)
  textContainer.append(uniqueWordCountBlock)
  popupBlock.append(textContainer)

  popupBlock.append(graphContainer)
  graphContainer.append(graphBlock)
  graphBlock.append(graphActiveBlock)
}
