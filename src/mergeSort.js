const sort = document.getElementById("mergeSort")
const shuffleButton = document.getElementById("shuffleButtonMergeSort")
const sortButton = document.getElementById("sortButtonMergeSort")

const array = []
const arraySize = 100
const arrayMax = 100

let currentIndex = -1

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
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

shuffleButton.addEventListener("click", () => {
  shuffle()
  display()
  currentIndex = -1
  shuffleButton.style.display = "none"
  sortButton.style.display = "block"
})

sortButton.addEventListener("click", async () => {
    await mergeSort(0, arraySize - 1);
    shuffleButton.style.display = "block";
    sortButton.style.display = "none";
  });
  
shuffle()
