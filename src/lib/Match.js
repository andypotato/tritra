export default class Match {

  /**
   * New match for triangle recognizer
   * @param {number} index index of matched angle
   * @param {number} matchedAngle the matched apex angle (not the actual angle!)
   * @param {Triangle} triangle matching triangle
   */
  constructor(index, matchedAngle, triangle) {
    this.index = index;
    this.matchedAngle = matchedAngle;
    this.triangle = triangle;
  }
  //----------------------------------------------------------------------------

  // delegation methods for convenience

  /**
   * Find apex point
   * @return {Vector2d} apex point
   */
  getApex() {
    return this.triangle.getApex();
  }

  /**
   * Calculate apex angle of triangle
   * @return {number} apex angle in degrees
   */
  getApexAngle() {
    return this.triangle.getApexAngle();
  }

  /**
   * Calculate center point
   * @return {Vector2d} center point
   */
  getCenter() {
    return this.triangle.getCenter();
  }

  /**
   * Calculate orientation of triangle
   * @return {number} orientation in degrees
   */
  getOrientation() {
    return this.triangle.getOrientation();
  }
  //----------------------------------------------------------------------------
}
