class Player {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.image = new Image();
    this.image.onload = () => {
      this.width = this.image.width / 4;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.frameRate = 4;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 30;
  }
  draw() {
    if (!this.image) return;
    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / 4,
      height: this.image.height,
    };

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  checkMapCollision() {
    if (this.position.x + this.width <= 0) {
      this.position.x = canvas.width;
    } else if (this.position.x >= canvas.width) {
      this.position.x = 0;
    }
    if (
      this.position.y + this.height + this.velocity.y - gravity <
      canvas.height
    ) {
      this.velocity.y += gravity;
    } else {
      canJump = true;
      this.velocity.y = 0;
    }
  }
  checkPlatformCollision() {
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];

      if (
        this.position.y + this.height >= platform.position.y &&
        this.position.y <= platform.position.y + platform.height &&
        this.position.x + this.width >= platform.position.x &&
        this.position.x <= platform.position.x + platform.width
      ) {
        if (
          this.position.y + this.height - this.velocity.y <=
          platform.position.y
        ) {
          this.position.y = platform.position.y - this.height;
          this.velocity.y = 0 + speed;
          canJump = true;
        }
      }
    }
  }
  updateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.updateFrames();
    this.checkMapCollision();
    this.checkPlatformCollision();
  }
}
