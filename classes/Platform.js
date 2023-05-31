class Platform {
  constructor({ position, moveRight, move, imageSrc }) {
    this.position = position;
    this.height = 20;
    this.width = 100;
    this.moveRight = moveRight;
    this.move = move;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.position.y > canvas.height) {
      this.position.y = 0;
      this.position.x = Math.min(
        Math.random() * canvas.width,
        canvas.width - this.width
      );
      this.move = Math.random() > 0.5;
      this.moveRight = Math.random() > 0.5;
      score += 1;
      if (score > 65) {
        this.image.src = "./assets/platform2.png";
      }
      if (score > 235) {
        this.image.src = "./assets/platform3.png";
      }
      if (score > 440) {
        this.image.src = "./assets/platform4.png";
      }
    }
    if (this.position.x + this.width >= canvas.width) {
      this.moveRight = false;
    } else if (this.position.x <= 0) {
      this.moveRight = true;
    }

    if (score > 1 && this.moveRight && this.move) {
      this.position.x += xspeed;
    }
    if (score > 1 && !this.moveRight && this.move) {
      this.position.x -= xspeed;
    }

    this.position.y += speed;
    this.draw();
  }
}
