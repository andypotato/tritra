# Triangle Tracker

A simple library for identifying isosceles triangles within a set of 2d points.

## Motivation

I was working on building an interactive touchscreen table with object recognition features. This concept uses marker discs with a distinct isosceles triangle pattern to distinguish objects, therefore I needed a library to handle all the math for identifying and tracking these triangles.

## Features

* Identify distinct isosceles triangles within a given set of 2d points
* Match triangles to pre-defined vertex angles
* Calculate additional triangle properties like orientation, center, height etc.

## Installation


Via NPM (recommended)
```shell
$ npm i --save tritra
```

Alternatively you can simply copy `dist/js/tritra.js` to your project.

## Usage

### Quickstart

Include the package in your HTML page:
```html
<script type="text/javascript" src="/path/to/tritra.js"></script>
```

First create an instance of the triangle recognizer class `tritra.Recognizer`. This class does all the heavy lifting and you should only create it once during your application lifecycle. To create the recognizer you must supply an array of vertex angles which you'd like the recognizer class to look out for.

```
// we're looking for triangles with 18, 36 and 54 degrees vertex angles
var vertexAngles = [18, 36, 54];

// create the recognizer
var R = new tritra.Recognizer(vertexAngles);
```

Define a set of 2d points. The utility class `tritra.Vector2d` simply represents the X and Y coordinates of a 2d point.
```javascript
var examplePoints = [
  // defines a triangle with 36 degrees vertex angle
  new tritra.Vector2d(300, 300),
  new tritra.Vector2d(366, 300),
  new tritra.Vector2d(333, 198)
];
```
Finally try to identify the triangles within your set of points. You will receive an array with all matches as the result value:
```javascript
var matches = R.findMatches(examplePoints);
```
Each array item will be a `tritra.Match` object containing the details of the matching triangle:
```javascript
var match = matches[0];

// index within your vertexAngles
console.log(match.index);
1

// the matched angle within the given tolerance (not the actual vertex angle)
console.log(match.matchedAngle);
36

// properties of the matched triangle
var centerPoint = match.triangle.getCenter();
console.log(centerPoint.x, centerPoint.y);
333, 266

// get the rotation (orientation) of the triangle in degrees
console.log(match.triangle.getOrientation());
-180
```
More properties are available. Check the documentation of `tritra.Match` or have a look at the included [example HTML file](https://github.com/andypotato/tritra/blob/master/dist/examples/index-tracker.html "example HTML file").

