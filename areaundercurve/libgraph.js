/**
 * Made by Earl Kennedy
 * https://github.com/Mnenmenth
 * https://mnenmenth.github.io
 * Refer to LICENSE file for licensing information
 */

function Coordinate(x, y) {
    this.x = x;
    this.y = y;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Dimension(width, height) {
    this.width = width;
    this.height = height;
}

function Graph(parentDim, xmax, xmin, ymax, ymin) {
    this.parentDim = parentDim;
    this.xmax = xmax;
    this.xmin = xmin;
    this.ymax = ymax;
    this.ymin = ymin;
}

Graph.prototype.xunits = function () {
  return Math.abs(this.xmax) + Math.abs(this.xmin);
};

Graph.prototype.yunits = function() {
  return Math.abs(this.ymin) + Math.abs(this.ymin);
};

Graph.prototype.xtick = function () {
  return this.parentDim.width / this.xunits();
};

Graph.prototype.ytick = function () {
  return this.parentDim.height / this.yunits();
};

Graph.prototype.coordinateToPixelPoint = function (c) {
  return new Point(
      Math.round((c.x + Math.abs(this.xmin)) * this.xtick()),
      Math.round(((-c.y) + Math.abs(this.ymin)) * this.ytick())
  );
};

Graph.prototype.c2p = function (c) {
  return this.coordinateToPixelPoint(c);
};

Graph.prototype.pixelPointToCoordinate = function (p) {
  return new Coordinate(
      (p.x / this.xtick) - Math.abs(this.xmin),
      (p.y / this.ytick) - Math.abs(this.ymin)
  );
};

Graph.prototype.p2c = function (p) {
    return this.pixelPointToCoordinate(p);
};