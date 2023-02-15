const sort = document.getElementById("quickSort")
const shuffleButton = document.getElementById("shuffleButtonQuickSort")
const sortButton = document.getElementById("sortButtonQuickSort")

const array = []
const arraySize = 100
const arrayMax = 100

let currentIndex = -1

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const shuffle = () => {
  for (let i = 0; i < arraySize; i++) {
    array[i] = Math.floor(Math.random() * arrayMax)
  }
}

const canvas = document.createElement("canvas")
canvas.classList.add("w-100")
canvas.classList.add("h-50")
canvas.classList.add("my-auto")

sort.appendChild(canvas)

const ctx = canvas.getContext("2d")
const barWidth = canvas.width / arraySize

const display = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < arraySize; i++) {
    const barHeight = array[i] / arrayMax * canvas.height

    if (i === currentIndex) {
      ctx.fillStyle = "#f00"
    } else {
      ctx.fillStyle = "#5c636a"
    }

    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight)
  }
}

const swap = (i, j) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

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

shuffle()
