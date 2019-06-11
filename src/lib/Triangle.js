import Vector2d from "./Vector2d";
import MathUtils from "./MathUtils";

export default class Triangle {

  // construction
  constructor(p1, p2, p3) {

    let dist = [
      MathUtils.distance(p1, p2),
      MathUtils.distance(p2, p3),
      MathUtils.distance(p1, p3)
    ];

    // identify apex
    // (b will always be the apex)

    let diff01m02 = Math.abs(dist[0] - dist[2]),
        diff02m12 = Math.abs(dist[2] - dist[1]),
        diff01m12 = Math.abs(dist[0] - dist[1]);

    if(diff01m02 < diff02m12 && diff01m02 < diff01m12) {
      this.a = p2;
      this.b = p1;
      this.c = p3;
    }
    else if(diff01m12 < diff01m02 && diff01m12 < diff02m12) {
      this.a = p1;
      this.b = p2;
      this.c = p3;
    }
    else if(diff02m12 < diff01m02 && diff02m12 < diff01m12) {
      this.a = p1;
      this.b = p3;
      this.c = p2;
    }

    // @TODO: throw error?
  }
  //----------------------------------------------------------------------------

  /**
   * Calculate orientation of triangle
   * @return {number} orientation in degrees
   */
  getOrientation() {

    let middlePoint = new Vector2d(
      MathUtils.lerp(this.a.x, this.c.x, 0.5),
      MathUtils.lerp(this.a.y, this.c.y, 0.5)
    );

    let diff = new Vector2d(this.b.x - middlePoint.x, this.b.y - middlePoint.y);
    diff.normalize();

    return MathUtils.radToDeg(Math.atan2(diff.x, diff.y)) * -1;
  }

  /**
   * Calculate altitude of triangle
   * @return {number} altitude
   */
  getAltitude() {

    let middlePoint = new Vector2d(
      MathUtils.lerp(this.a.x, this.c.x, 0.5),
      MathUtils.lerp(this.a.y, this.c.y, 0.5)
    );

    return MathUtils.distance(middlePoint, this.b);
  }

  /**
   * Calculate apex angle of triangle
   * @return {number} apex angle in degrees
   */
  getApexAngle() {

    let ab = new Vector2d(this.b.x - this.a.x, this.b.y - this.a.y);
    let cb = new Vector2d(this.b.x - this.c.x, this.b.y - this.c.y);

    let dot = (ab.x * cb.x + ab.y * cb.y); // dot product
    let cross = (ab.x * cb.y - ab.y * cb.x); // cross product
    let alpha = Math.atan2(cross, dot);

    return Math.abs(Math.floor(alpha * 180 / Math.PI + 0.5));
  }

  /**
   * Calculate width of triangle
   * @return {number} width
   */
  getWidth() {
    return MathUtils.distance(this.a, this.c);
  }

  /**
   * Calculate center point
   * @return {Vector2d} center point
   */
  getCenter() {
    return new Vector2d(
      (this.a.x + this.b.x + this.c.x) / 3,
      (this.a.y + this.b.y + this.c.y) / 3
    );
  }

  /**
   * Find apex point
   * @return {Vector2d} apex point
   */
  getApex() {
    return this.b;
  }
}
