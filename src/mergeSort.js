// Merge sort script that listen to shuffle and sort button
// and display the shuffling and sorting process in the mergeSort dom element

const sort = document.getElementById("mergeSort")
const shuffleButton = document.getElementById("shuffleButtonMergeSort")
const sortButton = document.getElementById("sortButtonMergeSort")

// Iniialization of the array and it's size
const array = []
const arraySize = 100
const arrayMax = 100

// Current index of the array
let currentIndex = -1

// Function to sleep the script for a given time
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// Function to shuffle the array
const shuffle = () => {
  for (let i = 0; i < arraySize; i++) {
    array[i] = Math.floor(Math.random() * arrayMax)
  }
}

//  Create the canvas and assign it classes
const canvas = document.createElement("canvas")
canvas.classList.add("w-100")
canvas.classList.add("h-50")
canvas.classList.add("my-auto")
// append the canvas to the mergeSort div
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

// Merge function
const merge = async (start, mid, end) => {
  const temp = []
  let i = start
  let j = mid + 1
  let k = 0

  while (i <= mid && j <= end) {
    if (array[i] <= array[j]) {
      temp[k] = array[i]
      i++
    } else {
      temp[k] = array[j]
      j++
    }
    k++
  }

  while (i <= mid) {
    temp[k] = array[i]
    i++
    k++
  }

  while (j <= end) {
    temp[k] = array[j]
    j++
    k++
  }

  for (let l = start, m = 0; l <= end; l++, m++) {
    array[l] = temp[m]
    currentIndex = l
    display()
    await sleep(5)
  }
}

const mergeSort = async (start, end) => {
  if (start >= end) {
    return
  }

  const mid = Math.floor((start + end) / 2)

  await mergeSort(start, mid)
  await mergeSort(mid + 1, end)
  await merge(start, mid, end)
}

// Event listener for the shuffle button
shuffleButton.addEventListener("click", () => {
  shuffle()
  display()
  currentIndex = -1
  shuffleButton.style.display = "none"
  sortButton.style.display = "block"
})


// Event listener for the sort button
sortButton.addEventListener("click", async () => {
    await mergeSort(0, arraySize - 1)
    shuffleButton.style.display = "block"
    sortButton.style.display = "none"
})

// Shuffle the array and display it
shuffle()
