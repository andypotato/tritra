export default class MathUtils {

  /**
   * calculate the distance between two vectors
   * @param {Vector2d} v1
   * @param {Vector2d} v2
   * @return {number} The distance
   */
  static distance(v1, v2) {
    return Math.sqrt(
      Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2)
    );
  }

  /**
   * linear interpolation of two values with given increase
   * @param {number} start
   * @param {number} end
   * @param {number} amount
   * @return {number} Interpolated value
   */
  static lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
  }

  /**
   * radians to degree conversion
   * @param {number} radians
   * @return {number} degree value
   */
  static radToDeg(radians) {
    return radians * (180 / Math.PI);
  }
}
