const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;

// Utility function to load images
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

// Load all images
const playerSprite = loadImage('spritechar.png');
const aboutMeImage = loadImage('aboutme.png');
const treeImage = loadImage('trees.png');
const levelImage = loadImage('level.png');
const backgroundImage = loadImage('background.png');
const smallPlatformImage = loadImage('small.png');
const hillImage = loadImage('hill.png');
const moreImage = loadImage('more.png');
const mountImage = loadImage('mount.png');
const buildingImage = loadImage('building.png');
const univImage = loadImage('univ.png');
const finishImage = loadImage('finish.png');

// Load images for existing and new platforms
const platformImage1 = loadImage('age.png');
const platformImage2 = loadImage('bday.png');
const platformImage3 = loadImage('sex.png');
const platformImage4 = loadImage('nation.png');
const yearImage = loadImage('year.png');
const dayImage = loadImage('day.png');
const genderImage = loadImage('gender.png');
const pipinoImage = loadImage('pipino.png');

// Load new images for banners
const level2Image = loadImage('second.png');
const skillsBannerImage = loadImage('skills.png');
const programImage = loadImage('program.png'); // New image
const level3Image = loadImage('third.png');
const expiBannerImage = loadImage('expi.png');
const compImage = loadImage('comp.png');
const taskImage = loadImage('task.png');
const level4Image = loadImage('fourth.png');
const educImage = loadImage('educ.png');
const cationImage = loadImage('cation.png');
const level5Image = loadImage('fifth.png');
const lastImage = loadImage('last.png');

// Player class
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };

        this.width = 100;
        this.height = 100;

        this.frame = 0;
        this.frameCount = 6;
        this.frameWidth = 48;
        this.frameHeight = 48;
        this.frameTimer = 0;
        this.frameInterval = 10;
    }

    draw() {
        c.drawImage(
            playerSprite,
            this.frame * this.frameWidth,
            48,
            this.frameWidth,
            this.frameHeight,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else this.velocity.y = 0;

        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.frame = (this.frame + 1) % this.frameCount;
            this.frameTimer = 0;
        }
    }
}

// Platform class
class Platform {
    constructor({ x, y, width = 700, height = 150, image }) {
        this.position = { x, y };
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw() {
        if (this.image.complete) {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }
}

// LevelIndicator class
class LevelIndicator {
    constructor({ x, y, width, height }) {
        this.position = { x, y };
        this.width = width;
        this.height = height;
    }

    draw() {
        if (levelImage.complete) {
            c.drawImage(levelImage, this.position.x, this.position.y, this.width, this.height);
        } else {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}

// Initialize game objects
const player = new Player();
const platforms = [
    new Platform({ x: 0, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 700, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 1300, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 1900, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 2700, y: 500, image: loadImage('platform.png') }),
    new Platform({ x: 3500, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 4000, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 4500, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 6200, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 6700, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 7200, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 7700, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 8750, y: 570, image: loadImage('platform.png') }),
    new Platform({ x: 10200, y: 420, image: loadImage('platform.png') })
    
];

const smallPlatforms = [
    new Platform({ x: 800, y: 520, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 980, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 5300, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 5600, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 5900, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 8500, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 9500, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 9700, y: 470, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 9900, y: 430, width: 150, height: 50, image: smallPlatformImage }),
    new Platform({ x: 1500, y: 490, width: 200, height: 50, image: platformImage1 }),
    new Platform({ x: 1750, y: 430, width: 200, height: 50, image: platformImage2 }),
    new Platform({ x: 2000, y: 430, width: 200, height: 50, image: platformImage3 }),
    new Platform({ x: 2250, y: 490, width: 200, height: 50, image: platformImage4 }),
    new Platform({ x: 1500, y: 300, width: 200, height: 50, image: yearImage }),
    new Platform({ x: 1750, y: 250, width: 200, height: 50, image: dayImage }),
    new Platform({ x: 2000, y: 250, width: 200, height: 50, image: genderImage }),
    new Platform({ x: 2250, y: 300, width: 200, height: 50, image: pipinoImage })
];

const trees = [
    new Platform({ x: 200, y: 90, width: 300, height: 550, image: treeImage }),
    new Platform({ x: 450, y: 90, width: 300, height: 550, image: treeImage }),
    new Platform({ x: 1200, y: 90, width: 300, height: 550, image: treeImage })
];

const hills = [
    new Platform({ x: 2700, y: 100, width: 400, height: 400, image: hillImage }),
    new Platform({ x: 3500, y: 170, width: 400, height: 400, image: hillImage }),
    new Platform({ x: 4500, y: 170, width: 400, height: 400, image: hillImage })
];

const mount = [
    new Platform({ x: 6550, y: 170, width: 400, height: 400, image: mountImage }),
    new Platform({ x: 6800, y: 170, width: 400, height: 400, image: mountImage }),
    new Platform({ x: 7800, y: 170, width: 400, height: 400, image: mountImage })
];

const levelIndicator = new LevelIndicator({
    x: 0,
    y: 0,
    width: 400,
    height: 300
});

// Banner objects
const aboutMeBanner = {
    position: { x: 1850, y: 80 },
    width: 300,
    height: 100
};

const level2Banner = {
    position: { x: 3000, y: 210 },
    width: 400,
    height: 300
};

const skillsBanner = {
    position: { x: 4050, y: 80 },
    width: 300,
    height: 100
};

const programBanner = {
    position: { x: 3950, y: 180 }, // New position for program.png
    width: 500,
    height: 400
};

const moreBanner = {
    position: { x: 5400, y: 60},
    width: 800,
    height: 400
};

const level3Banner = {
    position: {x: 6250, y: 280},
    width: 400,
    height: 300
};

const expiBanner = {
    position: {x: 6720, y: 80},
    width: 300,
    height: 100
};

const compBanner = {
    position: {x: 7100, y: 80},
    width: 600,
    height: 200
};

const buildingBanner = {
    position: {x: 7450, y: 70},
    width: 400,
    height: 500
};

const taskBanner = {
    position: {x: 7300, y: 270},
    width: 200,
    height: 150
};

const level4Banner = {
    position: {x: 8150, y: 280},
    width: 400,
    height: 300
};

const educBanner = {
    position: { x: 8450, y: 80 },
    width: 300,
    height: 100
};

const cationBanner = {
    position: { x: 8950, y: 80 },
    width: 300,
    height: 300
};

const univBanner = {
    position: { x: 8950, y: 300 },
    width: 300,
    height: 300
};

const level5Banner = {
    position: { x: 9380, y: 180 },
    width: 400,
    height: 300
};

const lastBanner = {
    position: { x: 10450, y: 100 },
    width: 400,
    height: 200
};

const finishBanner = {
    position: { x: 10250, y: 45 },
    width: 200,
    height: 400
};

const keys = {
    right: { pressed: false },
    left: { pressed: false }
};

let scrollOffset = 0;
let gameOver = false;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Draw the background
    c.drawImage(backgroundImage, -scrollOffset, 0, canvas.width + scrollOffset, canvas.height);

    // Draw objects
    hills.forEach((hill) => hill.draw());
    mount.forEach((mount) => mount.draw());
    trees.forEach((tree) => tree.draw());
    platforms.forEach((platform) => platform.draw());
    smallPlatforms.forEach((platform) => platform.draw());

    // Draw the banners
    c.drawImage(
        aboutMeImage,
        aboutMeBanner.position.x - scrollOffset,
        aboutMeBanner.position.y,
        aboutMeBanner.width,
        aboutMeBanner.height
    );

    c.drawImage(
        level2Image,
        level2Banner.position.x - scrollOffset,
        level2Banner.position.y,
        level2Banner.width,
        level2Banner.height
    );

    c.drawImage(
        skillsBannerImage,
        skillsBanner.position.x - scrollOffset,
        skillsBanner.position.y,
        skillsBanner.width,
        skillsBanner.height
    );

    c.drawImage(
        programImage,
        programBanner.position.x - scrollOffset,
        programBanner.position.y,
        programBanner.width,
        programBanner.height
    );

    c.drawImage(
        moreImage,
        moreBanner.position.x - scrollOffset,
        moreBanner.position.y,
        moreBanner.width,
        moreBanner.height
    );

    c.drawImage(
        level3Image,
        level3Banner.position.x - scrollOffset,
        level3Banner.position.y,
        level3Banner.width,
        level3Banner.height
    );

    c.drawImage(
        expiBannerImage,
        expiBanner.position.x - scrollOffset,
        expiBanner.position.y,
        expiBanner.width,
        expiBanner.height
    );

    c.drawImage(
        compImage,
        compBanner.position.x - scrollOffset,
        compBanner.position.y,
        compBanner.width,
        compBanner.height
    );

    c.drawImage(
        buildingImage,
        buildingBanner.position.x - scrollOffset,
        buildingBanner.position.y,
        buildingBanner.width,
        buildingBanner.height
    );

    c.drawImage(
        taskImage,
        taskBanner.position.x - scrollOffset,
        taskBanner.position.y,
        taskBanner.width,
        taskBanner.height
    );

    c.drawImage(
        level4Image,
        level4Banner.position.x - scrollOffset,
        level4Banner.position.y,
        level4Banner.width,
        level4Banner.height
    );

    c.drawImage(
        educImage,
        educBanner.position.x - scrollOffset,
        educBanner.position.y,
        educBanner.width,
        educBanner.height
    );

    c.drawImage(
        cationImage,
        cationBanner.position.x - scrollOffset,
        cationBanner.position.y,
        cationBanner.width,
        cationBanner.height
    );

    c.drawImage(
        univImage,
        univBanner.position.x - scrollOffset,
        univBanner.position.y,
        univBanner.width,
        univBanner.height
    );

    c.drawImage(
        level5Image,
        level5Banner.position.x - scrollOffset,
        level5Banner.position.y,
        level5Banner.width,
        level5Banner.height
    );

    c.drawImage(
        lastImage,
        lastBanner.position.x - scrollOffset,
        lastBanner.position.y,
        lastBanner.width,
        lastBanner.height
    );

    c.drawImage(
        finishImage,
        finishBanner.position.x - scrollOffset,
        finishBanner.position.y,
        finishBanner.width,
        finishBanner.height
    );

    // Draw the level indicator
    if (smallPlatforms.length > 0) {
        const firstSmallPlatform = smallPlatforms[0];
        levelIndicator.position.x = firstSmallPlatform.position.x + (firstSmallPlatform.width / 2) - (levelIndicator.width / 2);
        levelIndicator.position.y = firstSmallPlatform.position.y - levelIndicator.height + 10;
        levelIndicator.draw();
    }

    // Update the player
    player.update();

    // Player movement and background scrolling
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach((platform) => (platform.position.x -= 5));
            trees.forEach((tree) => (tree.position.x -= 5));
            smallPlatforms.forEach((platform) => (platform.position.x -= 5));
            hills.forEach((hill) => (hill.position.x -= 5));
            mount.forEach((mount) => (mount.position.x -= 5));
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach((platform) => (platform.position.x += 5));
            trees.forEach((tree) => (tree.position.x += 5));
            smallPlatforms.forEach((platform) => (platform.position.x += 5));
            hills.forEach((hill) => (hill.position.x += 5));
            mount.forEach((mount) => (mount.position.x += 5));
        }
    }

    // Collision detection for platforms
    platforms.concat(smallPlatforms).forEach((platform) => {
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    });

    if (scrollOffset > 10300) {
        gameOver = true;
        c.font = '48px Arial';
        c.fillStyle = 'black';
        c.fillText('Thank You!!', canvas.width / 2 - 100, canvas.height / 2);
    }
}

animate();

// Key events
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 38:
            if (player.velocity.y === 0) player.velocity.y -= 10;
            break;
        case 39:
            keys.right.pressed = true;
            break;
        case 37:
            keys.left.pressed = true;
            break;
    }
});

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 39:
            keys.right.pressed = false;
            break;
        case 37:
            keys.left.pressed = false;
            break;
    }
});
