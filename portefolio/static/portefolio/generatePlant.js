let y;
const canvas = document.getElementById('vines');
const context = canvas.getContext('2d');
const canvasb = document.getElementById('leaves');
const contextb = canvasb.getContext('2d');
const leaves = [];

// Set explicit dimensions
canvas.width = window.innerWidth * 3;
canvas.height = window.innerHeight * 3;
canvasb.width = window.innerWidth * 3;
canvasb.height = window.innerHeight * 3;

// Rest of your code...
const isDarkMode = () =>
    globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false;

const gradientLeaves = contextb.createLinearGradient(0, 0, canvas.width, canvas.height);
const gradientLeaves2 = contextb.createLinearGradient(0, 0, canvas.width, canvas.height);
const gradientVines = context.createRadialGradient(0, 0, 500, 0, 0, 1000);
const gradientPistil = contextb.createRadialGradient(0, 0, 0, 0, 0, 100);

if (!isDarkMode()) {
    gradientVines.addColorStop(0, '#045c07'); // Vert clair au début
    gradientVines.addColorStop(0.5, '#09791e'); // Vert au milieu
    gradientVines.addColorStop(1, '#0cd440');
} else {
    gradientVines.addColorStop(0, '#012803'); // Vert clair au début
    gradientVines.addColorStop(0.5, '#064613'); // Vert au milieu
    gradientVines.addColorStop(1, '#11772b');
}


if (!isDarkMode()) {
    gradientLeaves.addColorStop(0, "rgba(162,48,4,0.97)");
    gradientLeaves.addColorStop(0.5, "rgba(201,45,10,0.97)");
    gradientLeaves.addColorStop(1, "rgba(210,20,43,0.97)");
} else {
    gradientLeaves.addColorStop(0, "rgba(100,160,168,0.97)");
    gradientLeaves.addColorStop(0.5, "rgba(71,188,180,0.97)");
    gradientLeaves.addColorStop(1, "rgba(64,86,204,0.97)");
}

gradientPistil.addColorStop(0, "rgba(231,170,29,0.91)");
gradientPistil.addColorStop(0.5, "rgba(227,184,91,0.91)");
gradientPistil.addColorStop(1, "rgba(243,214,146,0.91)");


// Calculate distance from point to line
function distancePointToLine(point, line) {
    var L = Math.sqrt(Math.pow(line[1].x - line[0].x, 2) + Math.pow(line[1].y - line[0].y, 2));
    var r = ((point.x - line[0].x) * (line[1].x - line[0].x) + (point.y - line[0].y) * (line[1].y - line[0].y)) / Math.pow(L, 2);
    var s = ((line[0].y - point.y) * (line[1].x - line[0].x) - (line[0].x - point.x) * (line[1].y - line[0].y)) / Math.pow(L, 2);
    if (r >= 0 && r <= 1) {
        return Math.abs(s) * L;
    } else {
        return Math.min(
            Math.sqrt(Math.pow(point.x - line[0].x, 2) + Math.pow(point.y - line[0].y, 2)),
            Math.sqrt(Math.pow(point.x - line[1].x, 2) + Math.pow(point.y - line[1].y, 2))
        );
    }
}

// Draw leaf
function drawLeaf(leaf, direction = 0) {
    const petals = 7;
    const petalWidth = leaf.size / 2;
    leaf.size = Math.min(leaf.size, 30)
    leaf.size = Math.max(20, leaf.size);

    contextb.save();
    contextb.fillStyle = gradientLeaves
    contextb.translate(leaf.x, leaf.y);
    contextb.rotate(leaf.angle + direction * Math.PI / 2);
    contextb.translate(-leaf.x, -leaf.y);
    contextb.strokeStyle = 'rgba(45,45,45,0.91)';
    contextb.strokeWidth = 1;

    // Dessiner chaque pétale
    for (let i = 0; i < petals; i++) {
        const angle = (Math.PI * 2 * i) / petals  - Math.PI / 2;
        contextb.beginPath();
        contextb.moveTo(leaf.x, leaf.y);
        contextb.bezierCurveTo(
            leaf.x + leaf.size * 3 * Math.cos(angle - Math.PI / 3),
            leaf.y + leaf.size * 3 * Math.sin(angle - Math.PI / 3),
            leaf.x + leaf.size * 4 * Math.cos(angle - Math.PI / 4),
            leaf.y + leaf.size * 4 * Math.sin(angle - Math.PI / 4),
            leaf.x + leaf.size * 2 * Math.cos(angle),
            leaf.y + leaf.size * 2 * Math.sin(angle)
        );
        contextb.bezierCurveTo(
            leaf.x + leaf.size * 2 * Math.cos(angle),
            leaf.y + leaf.size * 2 * Math.sin(angle),
            leaf.x - leaf.size * 2 * Math.cos(angle - Math.PI / 3),
            leaf.y - leaf.size * 2 * Math.sin(angle - Math.PI / 3),
            leaf.x,
            leaf.y
        )
        contextb.closePath();
        contextb.fill();
        contextb.stroke();
    }

    // Dessiner le centre de la fleur
    contextb.fillStyle = 'rgba(231,170,29,0.91)';
    contextb.beginPath();
    contextb.arc(leaf.x, leaf.y, petalWidth + 10, 0, Math.PI * 2, false);
    contextb.closePath();
    contextb.fill();
    contextb.stroke();

    contextb.restore();
}

// Draw vine
function drawVinesWithLattice(lattice, seeds, iterations, sort, prune, minLength, maxLength) {

    let t = 1;
    const maxLineWidth = 300;

    // Create initial branches
    let branches = [];
    for (const i in seeds) {
        branches.push({
            points: [
                {x: seeds[i].x, y: seeds[i].y},
                {x: seeds[i].x, y: seeds[i].y},
                {x: seeds[i].x, y: seeds[i].y},
                {x: seeds[i].x, y: seeds[i].y}
            ],
            angle: 0,
            distanceToLattice: 500,
            lineWidth: 1,
            active: true,
            leaf: false
        });
    }

    // Animation function
    function tick() {

        let y2;
        let x2;
        let i;
// Draw branches
        contextb.clearRect(0, 0, canvasb.width, canvasb.height);
        for (i in branches) {
            const ax = (-branches[i].points[0].x + 3 * branches[i].points[1].x - 3 * branches[i].points[2].x + branches[i].points[3].x) / 6;
            const ay = (-branches[i].points[0].y + 3 * branches[i].points[1].y - 3 * branches[i].points[2].y + branches[i].points[3].y) / 6;
            const bx = (branches[i].points[0].x - 2 * branches[i].points[1].x + branches[i].points[2].x) / 2;
            const by = (branches[i].points[0].y - 2 * branches[i].points[1].y + branches[i].points[2].y) / 2;
            const cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2;
            const cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2;
            const dx = (branches[i].points[0].x + 4 * branches[i].points[1].x + branches[i].points[2].x) / 6;
            const dy = (branches[i].points[0].y + 4 * branches[i].points[1].y + branches[i].points[2].y) / 6;
            context.strokeStyle = gradientVines;
            context.lineWidth = branches[i].lineWidth;
            context.beginPath();
            context.moveTo(
                ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
                ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
            );
            context.lineTo(
                ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx,
                ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy
            );
            context.stroke();
            context.closePath();

            // Draw leaf
            if (branches[i].leaf) {
                if (branches[i].active) {
                    const x1 = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx;
                    const y1 = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy;
                    x2 = ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx;
                    y2 = ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy;
                    branches[i].leaf.x = x2;
                    branches[i].leaf.y = y2;
                    branches[i].leaf.angle = Math.atan2(y2 - y1, x2 - x1) - (Math.PI / 2);
                    branches[i].leaf.size = branches[i].lineWidth * 1;
                } else {
                    branches[i].leaf.size = (branches[i].lineWidth + t) * 1;
                }
                drawLeaf(branches[i].leaf);
            }
        }

        // Draw leaves
        for (i in leaves) {
            drawLeaf(leaves[i], 0);
        }

        // When finished drawing splines, create a new set of branches
        t += 0.04;
        if (t >= 1) {
            const new_branches = [];
            for (let j = branches.length - 1; j >= 0; j--) {
                if (branches[j].active) {

                    // Split branch into two
                    for (let k = 0; k < 2; k++) {

                        // Generate random deviation from previous angle
                        const angle = branches[j].angle - (Math.random() * 180 - 90);

                        // Determine closest lattice point
                        let distance = 100000;
                        for (const l in lattice) {
                            const result = distancePointToLine(branches[j].points[3], lattice[l]);
                            if (result < distance) distance = result;
                        }

                        // Generate random length
                        const length = Math.random() * (maxLength - minLength) + minLength;

                        // Calculate new point
                        x2 = branches[j].points[3].x + Math.sin(Math.PI * angle / 180) * length;
                        y2 = branches[j].points[3].y - Math.cos(Math.PI * angle / 180) * length;

                        // Add to new branch array
                        new_branches.push({
                            points: [
                                branches[j].points[1],
                                branches[j].points[2],
                                branches[j].points[3],
                                {x: x2, y: y2}
                            ],
                            angle: angle,
                            distanceToLattice: distance,
                            lineWidth: 6,
                            active: true,
                            leaf: {
                                x: x2,
                                y: y2,
                                angle: 0
                            },
                            parent: branches[j]
                        });

                        // "Deactivate" branch
                        branches[j].active = false;
                    }

                    // Grow branch
                } else {
                    branches[j].lineWidth++;
                    if (branches[j].lineWidth > maxLineWidth) {
                        leaves.push(branches[j].leaf);
                        branches.splice(j, 1);
                    }
                }
            }

            // Sort branches by distance to lattice
            new_branches.sort(function(a, b) {
                return a.distanceToLattice - b.distanceToLattice;
            });

            // If over 10 branches, prune the branches furthest from the lattice
            if (prune) {
                if (sort) {
                    while (new_branches.length > 10) new_branches.pop();
                } else {
                    while (new_branches.length > 10) {
                        new_branches.splice(Math.floor(Math.random() * new_branches.length), 1);
                    }
                }
            }

            // Remove leaves from parent
            for (i = 0; i < new_branches.length; i++) {
                new_branches[i].parent.leaf = false;
            }

            // Replace old branch array with new
            branches = branches.concat(new_branches);
            iterations--;
            t = 0;
        }

        // Keep on animating
        if (iterations > 0) {
            requestAnimationFrame(tick);
        }
    }
    tick();
}

// Setup lattice
const space = canvas.height / 5; // Augmenter cette valeur pour augmenter l'espace entre les lattices
const lattice = [];
for (y = -space * 2; y < space * 2; y += space) { // Augmenter l'incrément pour réduire le nombre de lattices
    lattice.push([
        {x:0, y:y+ canvas.height},
        {x:canvas.width, y:y}
    ]);
}
for (y = -space * 2; y < space * 2; y += space) { // Augmenter l'incrément pour réduire le nombre de lattices
    lattice.push([
        {x:canvas.width, y:y+ canvas.height},
        {x:0, y:y}
    ]);
}

// Draw lattice
context.strokeStyle = 'rgba(0,0,0,0)';
context.lineWidth =1;
context.lineCap = 'round';
for (const i in lattice) {
    context.beginPath();
    context.moveTo(lattice[i][0].x, lattice[i][0].y);
    context.lineTo(lattice[i][1].x, lattice[i][1].y);
    context.stroke();
}
context.strokeStyle = gradientVines;

// Create vines
const minLength = 100;
const maxLength = 400;
const iterations = 25;

const step = 300;
let seeds = [];

// Boucle for pour ajouter des graines
for (let i = 0; i < canvas.height; i+=step) {
    // Ajouter la nouvelle graine au tableau seeds
    seeds.push({x: 1, y: i});
    seeds.push({x: canvas.width - 1, y: i - 10});
}
drawVinesWithLattice(lattice, seeds, iterations, true, true, minLength, maxLength);