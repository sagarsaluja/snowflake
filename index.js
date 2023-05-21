/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("load", () => {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const center = [canvas.width * 0.5, canvas.height * 0.5];
    const Pentagon = [];
    let count = 0;
    let DP, NP;
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
        if (endingPoint === startingPoint) {
        }
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
        count++;
        if (count > 100000) return;
        let endingPoint;
        if (endPoint === null) {
            endingPoint = findEndingPoint(startingPoint)
        }
        else {
            endingPoint = endPoint;
        };
        let drawnPoint = findHalfway(Pentagon[startingPoint] ?? startingPoint, Pentagon[endingPoint]);
        context.fillRect(drawnPoint[0], drawnPoint[1], 1, 1);
        let newPoint = chooseNewPoint(endingPoint);
        DP = drawnPoint; NP = newPoint;
    }
    const animate = (timestamp) => {
        drawParticle(DP, NP);
        requestAnimationFrame(animate);
    }
    context.fillStyle = "red";
    findPentagonVertices(500);
    drawParticle(0, null);
    animate(0);
})


// logic
// randomly select a point => 3

//move halfway (from point 1) to the selected point and draw a point.

// Now excluding point 3 , choose another point at random.

// from the last drawn dot , and the chosen point , draw another dot at their half point.


// startingPoint , Ending point , drawnPoint , (choose newpoint !== endingPoint, startingPoint ) 