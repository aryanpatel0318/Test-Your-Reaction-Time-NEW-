let circleX=50
let circleY=50
let circleSize=50
let score=0
let timer=120
let gameState = "start"
let darkerCircleX=-1
let darkerCircleY=-1
let hasDarkerCircle=false

function setup() {
  createCanvas(400,400)
  moveCircle()
}

function draw() {
  background(200)

  if (gameState == "start") {
    textSize(32)
    textAlign(CENTER,CENTER)
    fill(0)
    text("Click to Start", width/2, height/2)
  } else if (gameState == "play") {
    fill(100,200,100)
    ellipse(circleX, circleY, circleSize, circleSize)

    if (hasDarkerCircle) {
      fill(100,185,100)
      ellipse(darkerCircleX, darkerCircleY, circleSize, circleSize)
    }

    fill(0)
    textSize(24)
    textAlign(LEFT, TOP)
    text("Score " + score, 10, 10)
    textAlign(RIGHT, TOP)
    text("Time " + timer, width - 10, 10)

    timer -= 1
    if (timer <= 0) {
      gameState = "gameOver"
    }
  } else if (gameState == "gameOver") {
    textSize(32)
    textAlign(CENTER, CENTER)
    fill(0)
    text("Game Over", width/2, height/2-20)
    textSize(24)
    text("Score " + score, width/2, height/2+20)
    text("Click to Restart", width/2, height/2+60)
  }
}

function mousePressed() {
  if (gameState == "start") {
    gameState = "play"
    resetGame()
  } else if (gameState == "gameOver") {
    gameState = "start"
  } else if (gameState == "play") {
    let clickedLightCircle = isCircleClicked(circleX, circleY)
    let clickedDarkerCircle = hasDarkerCircle && isCircleClicked(darkerCircleX, darkerCircleY)

    if (clickedLightCircle) {
      score += 1
      if (score % 3 == 0 && timer > 50) {
        timer -= 10
      }
      moveCircle()
    } else if (clickedDarkerCircle) {
      gameState = "gameOver"
    }
  }
}

function isCircleClicked(x, y) {
  return mouseX > x - circleSize / 2 && mouseX < x + circleSize / 2 && mouseY > y - circleSize / 2 && mouseY < y + circleSize / 2
}

function moveCircle() {
  circleX = int(random(4)) * 100+50
  circleY = int(random(4)) * 100+50

  hasDarkerCircle = random(1) > 0.7
  if (hasDarkerCircle) {
    do {
      darkerCircleX = int(random(4)) * 100+50
      darkerCircleY = int(random(4)) * 100+50
    } while (darkerCircleX == circleX && darkerCircleY == circleY)
  } else {
    darkerCircleX = -1
    darkerCircleY = -1
  }

  timer = max(timer, 50)
}

function resetGame() {
  score=0
  timer=120
  moveCircle()
  hasDarkerCircle = false
  darkerCircleX = -1
  darkerCircleY = -1
}
