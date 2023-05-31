class Background {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    if (!this.image) return;
    const verticalOffset = this.image.height - canvas.height;
    c.drawImage(this.image, this.position.x, this.position.y - verticalOffset);
  }

  update() {
    this.draw();
    this.position.y += speed / 3;
  }
}
