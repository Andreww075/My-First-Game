///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// player //

class player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color; 

    this.controls = new controls();
  }

  update() {
    if (this.controls.left) {
      this.x -= 5;
    }
    if (this.controls.right) {
      this.x += 5;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x,
      this.y,
            this.width,
            this.height,
    );

    ctx.fillStyle = this.color;
    ctx.fill();

    if (this.x > 500 || this.x < 0) {
      this.x = -this.x, false;
    }
  }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Controls //

class controls {
  constructor(left, right) {
    this.left = false;
    this.right = false;

    this.#addKeyboardListeners();
  }

  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.left = true;
          break;
        case 'ArrowRight':
          this.right = true;
          break;  
      }
    }

    document.onkeyup = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          this.left = false;
          break;
        case 'ArrowRight':
          this.right = false;
          break;  
      }
    }
  }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ball //

class ball {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath;

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y + this.vy > 550 || this.y + this.vy < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx > 600 || this.x + this.vx < 0) {
      this.vx = -this.vx;
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Game //

const canvas = document.querySelector('.myCanvas');
const score = document.querySelector('.score');

let points = 0;

canvas.height = 550;

const ctx = canvas.getContext('2d');
player = new player(300, 500, 100, 15, 'red');
ball = new ball(250, 100, 3, 3, 15, 'black');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }  
  return color;
}

animate();
function animate() {
  player.update();

  canvas.width = 600;
  ball.draw(ctx);
  player.draw(ctx);
 
  // detect collision with player//
  if (ball.x + ball.vx > player.x - player.width &&
      ball.x + ball.vx < player.x + player.width &&
      ball.y + ball.vy > player.y - player.height &&
      ball.y + ball.vy < player.y + player.height) {
        ball.vx++;
        ball.vy = -ball.vy;
        ball.color = getRandomColor();
        player.color = getRandomColor();
        canvas.style.border = `3px solid ${getRandomColor()}`;

        points++;
        score.innerHTML = points;
  }

  // detect game over//

  if (ball.y + ball.vy > canvas.height - 10) {
    points = 0;
    score.innerHTML = points;
    alert('Game over');
    ball.x = 300;
    ball.y = 100;
    ball.vx = 3;
    ball.vy = 3;
    ball.color = 'lightpink';
    player.color = 'lightgrey';
    player.x = 300;
  }

  requestAnimationFrame(animate);
}