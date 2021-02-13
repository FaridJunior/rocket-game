class Star {
  constructor(location = { x: 0, y: -50, z: 0 }, size = { width: 0, height: 0 }, speed = 2) {
    this.location = location;
    this.size = size
    this.speed = speed;
    this.element;
    this.setElement();
    this.setLocationX(location.x)
    this.setLocationY(location.y)
    this.location.z = 0;
  }

  watchLocationX() {
    this.element.style.left = `${this.location.x}px`
  }

  watchLocationY() {
    this.element.style.top = `${this.location.y}px`
  }

  setLocationX(x) {
    this.location.x = x
    this.watchLocationX()
  }

  setLocationY(y) {
    this.location.y = y
    this.watchLocationY()
  }

  moveRight() {
    this.setLocationX(this.location.x + this.speed)
  }

  setElement() {
    this.element = this.makeStarElement();
    document.body.appendChild(this.element)
  }

  removeElement() {
    this.element.remove();
  }

  moveDown() {
    this.setLocationY(this.location.y + this.speed);
  }

  makeStarElement() {
    const starElement = document.createElement("div")
    starElement.style.width = `${this.size.width}px`;
    starElement.style.height = `${this.size.width}px`;
    starElement.style.background = `hsl(${this.size.width * 10},83%,62%)`;

    starElement.className = "star";
    return starElement
  }

}

const rocket = {
  top: 450
}



function main() {

  const game = {

    stars: [],
    width: window.innerWidth,
    height: window.innerHeight,

    work: null,
    score: 0,

    rocket: rocket,

    moveStarsDown: function () {
      this.stars.forEach((star, index) => {
        star.moveDown()

        if (this.checkLose(star)) {
          this.endGame()
          this.stars.length = 0; // break fro loop
        }
        this.checkIfStarOutOfView(star,index)
      })
    },

    checkIfStarOutOfView: function (star, index) {
      if (star.location.y > this.height) {
        console.log("hi")
        star.removeElement()
        // const newStar = this.createStar()
        // remove star
        this.stars.splice(index, 0)
      }
    },

    createGameStartStars() {
      for (let i = 0; i < 10; i++) {

        const starObj = this.createStar();

        this.stars.push(starObj);
      }
    },

    createStar: function(){
      const x = getRandomInt(-5 , this.width)
      const width = getRandomInt(20, 60)

      const star = new Star(location = { x: x, y: -50, z: 0 }, size = { width:width, height: 0 })
      return star
    },

    checkLose: function (star) {
      if (this.rocket.top <= star.location.y) {
        return true
      }
    },

    endGame: function () {
      this.stop()
      alert(`score : ${this.score}`);
    },

    start: function () {
      // this.createGameStartStars()
      this.score = 0;
      this.resume()
    },

    createRandomStars: function(){
      this.stars.push(this.createStar())
    },
    
    resume: function () {
      setInterval(()=> game.createRandomStars(),900)
      this.work = setInterval(() => game.moveStarsDown(), 40)
    },

    stop: function () {
      clearInterval(this.work)
    }

  }


  // function removeStars() {
  //   for (star of game.stars) {
  //     star.element.remove();
  //   }
  //   delete game.stars;
  //   console.log(game.stars)
  // }

  game.start()
  
  // const work = setInterval(()=>game.moveStarsDown(), 40)
  // setInterval(() => restStarsLocations(stars), 16000)
  setTimeout(() => game.stop(), 9000)
  // setInterval(() => console.log(stars[2]), 2000)
  // setTimeout(removeStars , 6000)
}


main()



//  assets
function getRandomInt(min, max) {
  max = max - min;
  return Math.floor(min + Math.random() * max);
}