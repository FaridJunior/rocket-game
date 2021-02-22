document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.querySelector("#score");
  const container = document.querySelector(".container");
  const startBtn = document.querySelector("#start");

  class Rocket {
    constructor(
      location = { x: window.innerWidth / 2 - 40, y: window.innerHeight - 130, z: 0 },
      speed = 5
    ) {
      this.location = location;
      this.speed = speed;
      this.element;
      this.setElement();
    }
    setElement() {
      const rocketElement = document.createElement("div");
      rocketElement.innerHTML = `
      <?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50pt" height="50pt" viewBox="0 0 50 50" version="1.1">
      <g id="surface1">
      <path style=" stroke:none;fill-rule:nonzero;fill:#DBDCD6;fill-opacity:1;" d="M 46.054688 26.726562 L 31.292969 19.347656 L 31.273438 9.375 C 31.273438 5.921875 28.476562 3.125 25.023438 3.125 C 21.570312 3.121094 18.773438 5.921875 18.773438 9.371094 L 18.75 19.347656 L 3.988281 26.726562 C 3.460938 26.992188 3.125 27.53125 3.125 28.125 L 3.125 32.8125 C 3.125 33.28125 3.335938 33.722656 3.695312 34.019531 C 4.058594 34.316406 4.535156 34.4375 4.992188 34.34375 L 18.75 31.59375 L 18.75 36.851562 L 16.082031 39.519531 C 15.789062 39.8125 15.625 40.210938 15.625 40.625 L 15.625 45.3125 C 15.625 45.78125 15.835938 46.222656 16.195312 46.519531 C 16.558594 46.816406 17.035156 46.9375 17.492188 46.84375 L 25 45.34375 L 32.507812 46.84375 C 32.964844 46.9375 33.441406 46.816406 33.804688 46.519531 C 34.164062 46.222656 34.375 45.78125 34.375 45.3125 L 34.375 40.625 C 34.375 40.214844 34.214844 39.820312 33.925781 39.527344 L 31.292969 36.859375 L 31.292969 31.59375 L 45.050781 34.34375 C 45.507812 34.4375 45.984375 34.316406 46.347656 34.019531 C 46.710938 33.722656 46.917969 33.28125 46.917969 32.8125 L 46.917969 28.125 C 46.917969 27.53125 46.585938 26.992188 46.054688 26.726562 Z M 46.054688 26.726562 "/>
      </g>
      </svg>
    `;
      rocketElement.className = "rocket";
      this.element = rocketElement;
      this.element.style.left = `${this.location.x}px`;
      this.element.style.top = `${this.location.y}px`;
      container.appendChild(this.element);
    }

    setLocationX(x) {
      this.location.x = x;
      this.watchLocationX();
    }

    setLocationY(y) {
      this.location.y = y;
      this.watchLocationY();
    }

    watchLocationX() {
      this.element.style.left = `${this.location.x}px`;
    }

    watchLocationY() {
      this.element.style.top = `${this.location.y}px`;
    }

    handleKeyPress(e) {
      switch (e.keyCode) {
        case 38:
          this.setLocationY(this.location.y - this.speed);
          break;
        case 40:
          this.setLocationY(this.location.y + this.speed);
          break;
        case 37:
          this.setLocationX(this.location.x - this.speed);
          break;
        case 39:
          this.setLocationX(this.location.x + this.speed);
          break;
      }
    }
  }
  class Star {
    constructor(location = { x: 0, y: -50, z: 0 }, size = { width: 0, height: 0 }, speed = 10) {
      this.location = location;
      this.size = size;
      this.speed = speed;
      this.element;
      this.setElement();
      this.setLocationX(location.x);
      this.setLocationY(location.y);
      this.location.z = 0;
    }

    watchLocationX() {
      this.element.style.left = `${this.location.x}px`;
    }

    watchLocationY() {
      this.element.style.top = `${this.location.y}px`;
    }

    setLocationX(x) {
      this.location.x = x;
      this.watchLocationX();
    }

    setLocationY(y) {
      this.location.y = y;
      this.watchLocationY();
    }

    moveRight() {
      this.setLocationX(this.location.x + this.speed);
    }

    setElement() {
      this.element = this.makeStarElement();
      container.appendChild(this.element);
    }

    removeElement() {
      this.element.remove();
    }

    moveDown() {
      this.setLocationY(this.location.y + this.speed);
    }

    makeStarElement() {
      const starElement = document.createElement("div");
      starElement.style.width = `${this.size.width}px`;
      starElement.style.height = `${this.size.width}px`;
      starElement.style.background = `hsl(${this.size.width * 10},83%,62%)`;
      starElement.style.animationDuration = `${8 / this.speed}s`;
      starElement.className = "star";
      return starElement;
    }
  }

  function main() {
    const game = {
      stars: [],
      width: window.innerWidth,
      height: window.innerHeight,
      newStarTime: Math.ceil(1000 / window.innerWidth) * 250,
      work: {},
      score: 0,

      rocket: new Rocket(),

      moveStarsDown: function () {
        this.stars.forEach((star, index) => {
          star.moveDown();

          if (this.checkLose(star)) {
            this.endGame();
            this.stars.length = 0; // break fro loop
          }
          this.checkIfStarOutOfView(star, index);
        });
      },

      checkIfStarOutOfView: function (star, index) {
        if (star.location.y > this.height) {
          this.removeStarFromGame(star, index);
        }
      },

      removeStarFromGame: function (star, index) {
        star.removeElement();
        this.stars.splice(index, 1);
        this.score++;
        scoreDisplay.textContent = this.score;
      },

      createStar: function () {
        const x = getRandomInt(0, this.width - 20);
        const width = getRandomInt(20, 60);

        const star = new Star({ x: x, y: -50, z: 0 }, { width: width, height: 0 }, 300 / width);

        return star;
      },

      checkLose: function (star) {
        if (
          star.location.y + star.size.height > this.rocket.location.y - 10 &&
          star.location.y + star.size.height < this.rocket.location.y + 40 &&
          star.location.x > this.rocket.location.x &&
          star.location.x < this.rocket.location.x + 50
        ) {
          return true;
        }
      },

      endGame: function () {
        this.stop();
        gameMusic.pause();

        alert(`score : ${this.score}`);
        location.reload();
      },

      start: function () {
        // this.createGameStartStars()
        this.score = 0;
        this.resume();
      },

      createRandomStars: function () {
        this.stars.push(this.createStar());
        this.stars.push(this.createStar());
      },

      resume: function () {
        this.work.randomStar = setInterval(() => game.createRandomStars(), this.newStarTime);
        this.work.move = setInterval(() => game.moveStarsDown(), 20);
      },

      stop: function () {
        clearInterval(this.work.move);
        clearInterval(this.work.randomStar);
      },
    };

    // function removeStars() {
    //   for (star of game.stars) {
    //     star.element.remove();
    //   }
    //   delete game.stars;
    //   console.log(game.stars)
    // }

    function handleMove(evt) {
      evt.preventDefault();
      var touches = evt.changedTouches;
      game.rocket.setLocationX(touches[0].pageX - 45);
      game.rocket.setLocationY(touches[0].pageY - 65);
    }

    game.start();
    document.addEventListener("keydown", (e) => game.rocket.handleKeyPress(e));
    document.addEventListener("touchstart", handleMove, false);
    document.addEventListener("touchend", handleMove, false);
    document.addEventListener("touchcancel", handleMove, false);
    document.addEventListener("touchmove", handleMove, false);
    // const work = setInterval(()=>game.moveStarsDown(), 40)
    // setInterval(() => restStarsLocations(stars), 16000)
    // setTimeout(() => game.stop(), 9000);
    // setInterval(() => console.log(stars[2]), 2000)
    // setTimeout(removeStars , 6000)
  }
  const gameMusic = new Audio("./game-music.10 PM");
  startBtn.addEventListener("click", () => {
    main();
    gameMusic.play();
    startBtn.style.display = "none";
  });
  gameMusic.addEventListener("ended", () => {
    gameMusic.play();
    gameMusic.playbackRate = gameMusic.playbackRate + 0.1;
  });
  // main();

  //  assets
  function getRandomInt(min, max) {
    max = max - min;
    return Math.floor(min + Math.random() * max);
  }
});
