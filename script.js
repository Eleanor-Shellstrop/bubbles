/*=============================================================
----------CLASSES
=============================================================*/

//  Attributes for every bubble

class Bubble {
    constructor (x, rate, color, scale, size) {
        this.x = x;
        this.rate = rate;
        this.color = color;
        this.scale = scale;
        this.size = size;
    }
}

//  Bubble factory class

class Multibubble {
    constructor() {
        this.bubbles = [];
        this.makeBubble();
        this.render();
    }

    //  Add 5 individualized bubbles, push to this.bubbles array

    makeBubble() {
        let bubbleDivs = ['bubble1', 'bubble2', 'bubble3', 'bubble4', 'bubble5'];
        for (let i = 0; i < bubbleDivs.length; i++) {

            //  Percentage point across x-axis where bubble will appear
            let moveX = Math.floor(Math.random() * 100);

            //  Speed the bubble moves to the top, between 1 - 5 seconds
            let speed = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

            // Random choice of 4 colors
            // Colors: peachpuff, lemonchiffon, lightblue, lavender
            let colors = ['#ffd9b893', '#fffacd93', '#add8e693', '#e6e6fa93'];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];

            //  Transform the scale as the bubbles approach top of screen
            let scales = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5];
            let randomScale = scales[Math.floor(Math.random() * scales.length)];

            //  Pixel size for width and height of bubble, between 25 - 125 in increments
            let sizes = [25, 50, 75, 100, 125];
            let randomSize = sizes[Math.floor(Math.random() * sizes.length)]

            //  Give Bubble class values
            Bubble.x = moveX;
            Bubble.rate = speed;
            Bubble.color = randomColor;
            Bubble.scale = randomScale;
            Bubble.size = randomSize;

            //  Push to bubbles array
            this.bubbles.push(new Bubble(moveX, speed, randomColor, randomScale, randomSize)); 
        }
           
    }
    //  Add to the DOM
    render() {
        for (let i = 0; i < this.bubbles.length; i++) {
            let div = document.createElement('div');
            div.className = 'bubble'; 
            document.getElementById('main').appendChild(div);
            div.style.left = `${this.bubbles[i].x}%`;
            div.style.animationDuration = `${this.bubbles[i].rate}s`;
            div.style.background = `radial-gradient(at 25% 25%,  #ffffffa4 0%, ${this.bubbles[i].color} 30%, #ffffff62 80%, #add8e6ad 100%)`;
            div.style.transform = `translateY(-100%) scale(${this.bubbles[i].scale})`;
            div.style.width = `${this.bubbles[i].size}px`;
            div.style.height = `${this.bubbles[i].size}px`;

        } 
    }         
}


//  Extend class to add new, unique bubbles for "more bubbles" button

class Extrabubble extends Multibubble {
    makeBubbleSize() {
        super.makeBubble();       
    }
    renderNewBubble() {
        super.render();
    }
}

const myBubbles = new Multibubble;


/*=============================================================
----------HTML LINKS & EVENT LISTENERS
=============================================================*/

//  More bubbles button

const bubbleButton = document.getElementById('more_bubbles');

bubbleButton.addEventListener('click', () => {
    const extra = new Extrabubble;
})


//  Reset button to clear screen

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
   let bubbleField = document.getElementsByClassName('bubble');
   for (let i = bubbleField.length - 1; i >= 0; i--) {
       let pop = bubbleField[i];
       document.getElementById('main').removeChild(pop);
   }
})

//  Faster button

// const faster = document.getElementById('faster');

// faster.addEventListener('click', () => {
//     const bubs = document.querySelectorAll('bubbles');
//     for (let i = 0; i < bubs.length; i++) {
//         let currentSpeed = bubs.style.animationDuration[i];
//         let speedUp = currentSpeed[i] * 2;
//         bubs.style.animationDuration = `${speedUp}s`;
//     }
// })