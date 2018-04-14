/**
 * Made by Earl Kennedy
 * https://github.com/Mnenmenth
 * https://mnenmenth.github.io
 * Refer to LICENSE file for licensing information
 */

function midpoint() {
    // Evaluate given function
    function f(x) {
        return math.eval(document.getElementById("func").value, {x: x});
    }

    // Assign input fields to variables
    var a = parseFloat(document.getElementById("aval").value);
    var b = parseFloat(document.getElementById("bval").value);
    var n = parseFloat(document.getElementById("numrect").value);

    // Calculate change in x
    var dx = (b - a) / n;

    // Create empty array for points for rectangles
    var points = [];

    // Fill array with points of rectangles
    var i = 0;
    do {
        points.push(a + (dx*i));
        i += 1;
    } while (points.slice(-1)[0] < b);

    // Calculate and fill array of midpoints
    var midpoints = [];
    for (i = 0; i < points.length - 1; i++) {
        midpoints.push((points[i] + points[i + 1]) / 2);
    }

    // Calculate f(midpoint) and add it to the sum
    var sum = 0;
    for (var p in midpoints) {
        sum += f(midpoints[p]);
    }

    // Multiply the sum by change in x
    var result = dx * sum;

    // Display the result
    var parent = document.getElementById("result");
    parent.innerHTML = "Area: " + result.toString();

    // Make sure canvas is appropriate size
    var inputs = document.getElementById("inputs");
    var c = document.getElementById("graph");
    c.width = window.innerWidth - inputs.offsetWidth;
    c.height = window.innerHeight;
    var ctx = c.getContext("2d");

    // Find the largest y value (disregarding negatives)
    var largey = 0;
    for(p in midpoints) {
        var y = f(midpoints[p]);
        if(Math.abs(y) > Math.abs(largey)) {
            largey = y;
        }
    }
    // Find the largest x value (disregarding negatives)
    var largex = 0;
    for(p in midpoints){
        if(Math.abs(midpoints[p]) > Math.abs(largex)){
            largex = midpoints[p];
        }
    }
    // Calculate max and min's for graph
    var extra = dx+(dx*0.5);
    var xmax = Math.abs(largex)+extra;
    var xmin = largex < 0 ? largex-extra : (-largex)-extra;
    var ymax = Math.abs(largey)+extra;
    var ymin = largey < 0 ? largey-extra : (-largey)-extra;

    // Create new graph - coordinate to pixel converter
    var g = new Graph(new Dimension(c.width, c.height), xmax, xmin, ymax, ymin);

    // Calculate points on graph from function
    var graphPoints = [];
    for(var x = g.xmin; x <= g.xmax; x+=0.1) {
        var y = f(x);
        var coord = new Coordinate(x, y);
        graphPoints.push(coord);
    }

    // Draw x and y axi on canvas
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    var horiz_start = g.c2p(new Coordinate(g.xmin, 0));
    var horiz_end = g.c2p(new Coordinate(g.xmax, 0));
    var vert_start = g.c2p(new Coordinate(0, g.ymin));
    var vert_end = g.c2p(new Coordinate(0, g.ymax));
    ctx.moveTo(horiz_start.x, horiz_start.y);
    ctx.lineTo(horiz_end.x, horiz_end.y);
    ctx.moveTo(vert_start.x, vert_start.y);
    ctx.lineTo(vert_end.x, vert_end.y);
    ctx.stroke();

    // Draw graph of function
    ctx.beginPath();
    ctx.strokeStyle = "#000066";
    var i = 1;
    for(p in graphPoints) {
        var pStart = g.c2p(graphPoints[p]);
        var pEnd = g.c2p(graphPoints[i]);
        ctx.moveTo(pStart.x, pStart.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        if (i < graphPoints.length-1) {
            i += 1;
        }
    }
    ctx.stroke();

    // Draw midpoint rectangles on graph
    for(p in midpoints) {
        var leftTop = g.c2p(new Coordinate(midpoints[p] - (dx/2), f(midpoints[p])));
        var rightTop = g.c2p(new Coordinate(midpoints[p] + (dx/2), f(midpoints[p])));
        var leftBottom = g.c2p(new Coordinate(midpoints[p] - (dx/2), 0));
        var rightBottom = g.c2p(new Coordinate(midpoints[p] + (dx/2), 0));

        ctx.beginPath();
        ctx.strokeStyle = "#006600";
        ctx.moveTo(leftTop.x, leftTop.y);
        ctx.lineTo(leftBottom.x, leftBottom.y);
        ctx.moveTo(leftTop.x, leftTop.y);
        ctx.lineTo(rightTop.x, rightTop.y);
        ctx.moveTo(rightTop.x, rightTop.y);
        ctx.lineTo(rightBottom.x, rightBottom.y);
        ctx.stroke();

    }
    ctx.stroke();

}

// If the input fields aren't empty, recalculate and resize everything on graph on window resize
window.addEventListener('resize', function (event) {
    var func = document.getElementById("func").value;
    var a = document.getElementById("aval").value;
    var b = document.getElementById("bval").value;
    var n = document.getElementById("numrect").value;
    if(func.length != 0 && a.length != 0 && b.length != 0 && n.length != 0) {
        midpoint();
    }
});