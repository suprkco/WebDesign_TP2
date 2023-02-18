// Quick sort script that listen to shuffle and sort button
// and display the shuffling and sorting process in the quickSort dom element

const sort = document.getElementById("quickSort")
const shuffleButton = document.getElementById("shuffleButtonQuickSort")
const sortButton = document.getElementById("sortButtonQuickSort")

// Iniialization of the array and it's size
const array = []
const arraySize = 100
const arrayMax = 100

// Current index of the array
let currentIndex = -1

// Function to sleep the script for a given time
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// Function to shuffle the array
const shuffle = () => {
  for (let i = 0; i < arraySize; i++) {
    array[i] = Math.floor(Math.random() * arrayMax)
  }
}

// Create the canvas and assign it classes
const canvas = document.createElement("canvas")
canvas.classList.add("w-100")
canvas.classList.add("h-50")
canvas.classList.add("my-auto")
// append the canvas to the quickSort div
sort.appendChild(canvas)

// Defines the size of the bars in the graph as a function of the size of the element and the size of the array
const ctx = canvas.getContext("2d")
const barWidth = canvas.width / arraySize

// Function to display the array
const display = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < arraySize; i++) {
    const barHeight = array[i] / arrayMax * canvas.height

    // If the current index is the one we are displaying, we display it in red
    if (i === currentIndex) {
      ctx.fillStyle = "#f00"
    } else {
      ctx.fillStyle = "#5c636a"
    }

    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight)
  }
}

// Swap the values of two elements in the array
const swap = (i, j) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

// Quick sort
const quickSort = async (start, end) => {
  if (start >= end) {
    return
  }
  const pivot = array[end]
  let i = start
  let j = end - 1
  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    if (i <= j) {
      swap(i, j)
      i++
      j--
    }
  }
  swap(i, end)
  currentIndex = i
  display()
  await sleep(20)
  await quickSort(start, i - 1)
  await quickSort(i + 1, end)
  currentIndex = -1
  display()
}

// Event listeners
shuffleButton.addEventListener("click", () => {
  shuffle()
  display()
  currentIndex = -1
  shuffleButton.style.display = "none"
  sortButton.style.display = "block"
})
sortButton.addEventListener("click", () => {
  quickSort(0, arraySize - 1)
  shuffleButton.style.display = "block"
  sortButton.style.display = "none"
})

// Initial shuffle
shuffle()
