import TouchPoint from "./TouchPoint";
import Vector2d from "./Vector2d";
import Triangle from "./Triangle";
import Match from "./Match";
import MathUtils from "./MathUtils";

export default class Recognizer {

  /**
   * Main recognizer instance
   * @param {number[]} apexAngles Apex angles you want to track
   * @param {Object} options Configuration options
   */
  constructor(apexAngles, options = {}) {

    // read options
    this.options = {...{
      maxPointDistance: 150,
      maxAngleTolerance: 5
    }, ...options};

    // apex angles to identify
    this.apexAngles = apexAngles;
  }

  /**
   * Recognize triangle objects within a set of given points
   * @param {Vector2d[]} points Set of points for recognizer to analyze
   * @return {Matches[]} Array of matches
   */
  findMatches(points) {

    // collect raw points
    //-------------------

    let touchPoints = [];
    for(let i = 0; i < points.length; i++) {
      let tp = new TouchPoint(points[i]);
      tp.isPaired = false;
      touchPoints.push(tp);
    }


    // find all pairs
    //---------------

    // count group index
    let groupIdx = 0;

    for(let i = 0; i < touchPoints.length; i++) {
      for(let j = 0; j < touchPoints.length; j++) {

        // no need to compare (same)
        if(i === j) { continue; }

        let tpDistance = MathUtils.distance(touchPoints[i].point, touchPoints[j].point);
        if(tpDistance <= this.options.maxPointDistance) {

          if(touchPoints[i].isPaired && touchPoints[j].isPaired) {
            // both already paired
            // skip points
          }
          else {
            // found a new pair
            groupIdx++;
            touchPoints[i].groups.push(groupIdx);
            touchPoints[j].groups.push(groupIdx);
            touchPoints[i].isPaired = true;
            touchPoints[j].isPaired = true;
          }
        }
      }
    }


    // group pairs into polygons
    //--------------------------

    let polygons = [];

    for(let i = 0; i < touchPoints.length; i++) {

      if(touchPoints[i].groups.length > 1) {

        // a point must belong to at least two pairs
        // otherwise it will not be considered any further

        let polygonPoints = [];

        for(let i2 = 0; i2 < touchPoints[i].groups.length; i2++) {
          for(let j = 0; j < touchPoints.length; j++) {
            for(let j2 = 0; j2 < touchPoints[j].groups.length; j2++) {
              if(touchPoints[i].groups[i2] == touchPoints[j].groups[j2]) {
                polygonPoints.push(touchPoints[j].point);
              }
            }
          }
        }

        if(polygonPoints.length > 0) {
          polygonPoints.push(touchPoints[i].point);
          polygons.push(polygonPoints);
        }
      }
    }

    // eliminate duplicates
    //---------------------

    let polygonsUnique = [];

    for(let i = 0; i < polygons.length; i++) {

      let polygonPoints = [];

      if(polygons[i].length > 0) {

        polygonPoints.push(polygons[i][0]);

        for(let j = 0; j < polygons[i].length; j++) {

          let exists = false;
          for(let k = 0; k < polygonPoints.length; k++) {
            if(polygonPoints[k] == polygons[i][j] || j == 0) {
              exists = true;
            }
          }

          if(exists == false) {
            polygonPoints.push(polygons[i][j]);
          }
        }
      }
      polygonsUnique.push(polygonPoints);
    }

    // detect requested triangles
    //---------------------------

    let matches = [];

    for(let i = 0; i < polygonsUnique.length; i++) {

      if(polygonsUnique[i].length !== 3) {
        // only consider triangles
        continue;
      }

      let triangle = new Triangle(
        polygonsUnique[i][0],
        polygonsUnique[i][1],
        polygonsUnique[i][2]
      );

      // calculate the apex angle
      let apexAngle = triangle.getApexAngle();

      // check if angle matches one of our requested triangles
      for(let j = 0; j < this.apexAngles.length; j++) {

        if(apexAngle > (this.apexAngles[j] - this.options.maxAngleTolerance) &&
           apexAngle < (this.apexAngles[j] + this.options.maxAngleTolerance)
        ) {
          // add to matches
          matches.push(new Match(j, this.apexAngles[j], triangle));
        }
      }

    }

    return matches;
  }
}