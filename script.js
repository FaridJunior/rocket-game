class Star {
  
  constructor(location = { x: 0, y: 0, z: 0 }, size = { width: 0, height: 0 }, speed = 0) {
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

  watchLocationY () {
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
    console.log("hello world")
    const starElement = document.createElement("div")
    starElement.className = "star"
    this.element = starElement;
  }


  moveBottom() {
    this.setLocationY(this.location.y + this.speed);
  }

}




function main() {

  function createStars() {
    const stars = [];
    let starFragment = document.createDocumentFragment()
    for (let i = 0; i < 100; i++) {
      const starObj = new Star(l = { x: i * 2, y: i * -2, z: 0 }, sz = { width: 0, height: 0 }, sp = 1);
      starFragment.appendChild(starObj.element);
      stars.push(starObj);
    }
    document.body.appendChild(starFragment)
    return stars
  }


  function moveStarsBotttom(stars) {
    console.time("time");
    stars.forEach(star => star.moveBottom())
    console.timeEnd("time")
  }

  function restStarsLocations(stars) {
    stars.forEach((star, i) => star.setLocationY(i * 2))
  }

  const stars = createStars()

  const work = setInterval(() => moveStarsBotttom(stars), 40)
  setInterval(() => restStarsLocations(stars), 16000)
  setTimeout(() => clearInterval(work), 5000)
  setInterval(() => console.log(stars[2]), 2000)
}


main()