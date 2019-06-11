export default class Vector2d {

  // construction
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  //----------------------------------------------------------------------------

  // accessors
  normalize() {

    let u = new Vector2d(
      this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)),
      this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    );

    this.x = u.x;
    this.y = u.y;
  }
  //----------------------------------------------------------------------------
}
