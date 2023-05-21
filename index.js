/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("load", () => {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const center = [canvas.width * 0.5, canvas.height * 0.5];
    const MAX_COUNT = 100000;
    const RADIUS = 500;
    const Pentagon = [];
    let COUNT = 0;
    let DRAWPOINT, NEWPOINT;

    const maxPosition = center[0] + RADIUS;
    const minPosition = center[0] - RADIUS;

    const gradientColor = (position) => {
        const normalizedPosition = (position - minPosition) / (maxPosition - minPosition);
        const r = 0;
        const g = Math.round((1 - normalizedPosition) * 255);
        const b = Math.round(normalizedPosition * 255);

        const hexR = r.toString(16).padStart(2, '0');
        const hexG = g.toString(16).padStart(2, '0');
        const hexB = b.toString(16).padStart(2, '0');

        return `#${hexR}${hexG}${hexB}`;
    }
    const findPentagonVertices = (radius) => {
        let arg, x, y;
        for (let k = 0; k < 5; k++) {
            arg = (2 * k * Math.PI) / 5;
            x = radius * Math.cos(arg) + center[0];
            y = radius * Math.sin(arg) + center[1];
            Pentagon.push([x, y]);
        }
        // drawPentagon();
    }
    const drawPentagon = () => {
        let prev, first, point;
        context.strokeStyle = "red";
        context.beginPath();
        for (let i = 0; i < Pentagon.length; i++) {
            point = Pentagon[i];

            if (prev === undefined) {
                first = Pentagon[0];
                prev = first;
                continue;
            }
            context.moveTo(prev[0], prev[1]);
            context.lineTo(point[0], point[1]);

            prev = point;
        }
        context.moveTo(prev[0], prev[1]);
        context.lineTo(first[0], first[1]);

        context.stroke();
    }

    const findHalfway = (st, ed) => {
        return [(st[0] + ed[0]) * 0.5, (st[1] + ed[1]) * 0.5];
    }
    const findEndingPoint = (startingPoint) => {
        let endingPoint;
        do {
            endingPoint = Math.floor(10 * Math.random()) % 5
        } while (endingPoint === startingPoint);
        return endingPoint;
    }
    const chooseNewPoint = (endingPoint) => {
        let newPoint;
        do {
            newPoint = Math.floor(10 * Math.random()) % 5
        } while (newPoint === endingPoint);
        return newPoint;
    }
    const drawParticle = (startingPoint, endPoint) => {
        COUNT++;
        const endingPoint = endPoint ?? findEndingPoint(startingPoint);
        const drawnPoint = findHalfway(Pentagon[startingPoint] ?? startingPoint, Pentagon[endingPoint]);
        context.fillStyle = gradientColor(drawnPoint[0]);
        context.fillRect(drawnPoint[0], drawnPoint[1], 1, 1);
        const newPoint = chooseNewPoint(endingPoint);
        DRAWPOINT = drawnPoint;
        NEWPOINT = newPoint;
    }
    const animate = () => {
        console.log(COUNT);
        drawParticle(DRAWPOINT, NEWPOINT);
        if (COUNT < MAX_COUNT) requestAnimationFrame(animate);
    }
    findPentagonVertices(RADIUS);
    drawParticle(0, null);
    animate(0);
})


// logic
// randomly select a point => 3

//move halfway (from point 1) to the selected point and draw a point.

// Now excluding point 3 , choose another point at random.

// from the last drawn dot , and the chosen point , draw another dot at their half point.


// startingPoint , Ending point , drawnPoint , (choose newpoint !== endingPoint, startingPoint ) 