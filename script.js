/**=============================================================
* 
**                          CLASSES
*
*=============================================================*/

/**
 * *------  BUBBLE  ------
 * For indivudal attributes assigned to each bubble
 */

class Bubble {
    constructor (x, delay, rate, color, scale, size) {
        this.x = x;
        this.delay = delay;
        this.rate = rate;
        this.color = color;
        this.scale = scale;
        this.size = size;
    }
}

/**
 * *------  MULTIBUBBLE ------
 * Bubble making factory to make 5 bubbles at a time
 */

class Multibubble {
    constructor() {
        this.bubbles = [];
        this.makeBubble();
        this.render();
    }

    //  Function adds 5 individualized bubbles, push to this.bubbles array

    makeBubble() {
        let bubbleDivs = ['bubble1', 'bubble2', 'bubble3', 'bubble4', 'bubble5'];
        for (let i = 0; i < bubbleDivs.length; i++) {

            //  Percentage point across x-axis where bubble will appear
            let moveX = Math.floor(Math.random() * 100);

            //  Stagger animation start between 0 - 5 seconds
            let wait = Math.floor(Math.random() * 5);

            //  Speed the bubble moves to the top, between 1.5 - 6 seconds
            let speed = Math.floor(Math.random() * (6 - 1.5 + 1)) + 1;

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
            Bubble.delay = wait;
            Bubble.rate = speed;
            Bubble.color = randomColor;
            Bubble.scale = randomScale;
            Bubble.size = randomSize;

            //  Push to bubbles array
            this.bubbles.push(new Bubble(moveX, wait, speed, randomColor, randomScale, randomSize)); 
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
            div.style.animationDelay = `${this.bubbles[i].delay}s`;
            div.style.background = `radial-gradient(at 25% 25%,  #ffffffa4 0%, ${this.bubbles[i].color} 30%, #ffffff62 80%, #add8e6ad 100%)`;
            div.style.transform = `translateY(-100%) scale(${this.bubbles[i].scale})`;
            div.style.width = `${this.bubbles[i].size}px`;
            div.style.height = `${this.bubbles[i].size}px`;
        } 
    }      
}

/**
 * *------  EXTRABUBBLE ------
 * Extends the Multibubble class so the factory doesn't
 * repeat the previous values when adding on
 * more bubbles with the "MORE BUBBLES" button.
 * See note at bottom of doc for details.
 */

class Extrabubble extends Multibubble {
    makeBubbleSize() {
        super.makeBubble();       
    }
    renderNewBubble() {
        super.render();
    }
}

//*------   FIRST BUBBLES ON PAGE LOAD ------
const myBubbles = new Multibubble;


/**============================================================
* 
**              HTML LINKS & EVENT LISTENERS
*
*=============================================================*/

/**
 * TODO: FIX TOGGLES AND RESETS.
 * Need to remove previous classes once a new button is pushed (working currently)
 * BUT also remove own element when pushed twice.
 * Example: 
 *      Pushing "BIGGER BUBBLES" once makes the bubbles bigger,
 *      pushing the button again does not remove the class
 *      because of the reset functions.
 * 
 *      Removing the reset functons keeps adding classes to existing ones. 
 *      TODO: Try switch?
 */


//*--------  MORE BUBBLES button ------

const bubbleButton = document.getElementById('more_bubbles');

bubbleButton.addEventListener('click', () => {
    const extra = new Extrabubble;
})


//*------  RESET button to clear screen  ------

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
   let bubbleField = document.getElementsByClassName('bubble');
   //   Iterate and remove each child
   for (let i = bubbleField.length - 1; i >= 0; i--) {
       let pop = bubbleField[i];
       document.getElementById('main').removeChild(pop);
   }
})

//*------  FASTER button ------

const faster = document.getElementById('faster');

    /**                 Event Listener: Iteration Notes
     * ------------------------------------------------------------------------
     * @param speed         Iterate through style property to find 
     *                      "animation-duration" time (string).
     *                       
     * @param oldSpeed      Parse the string to find integer. Assigned here.                      
     *      
     *  Remove the current duration property and replace with the new one.
     * 
     * @param newSpeed      Takes the current duration and subtracts half a second.
     * 
     *  Will decrease every click. Maximum speed set to 0.5s
     * -------------------------------------------------------------------------
     */

faster.addEventListener('click', () => {
    //  Declare all appended children with class "bubble"
    let allBubbles = document.getElementsByClassName('bubble');
    for (let i = 0; i < allBubbles.length; i++) {
        let speed = allBubbles[i].style.animationDuration;
        let oldSpeed = parseFloat(speed);
        let newSpeed = oldSpeed - 0.5;
        allBubbles[i].style.removeProperty("animation-duration");
        if (newSpeed > 0) {
            allBubbles[i].style.animationDuration = `${newSpeed}s`; 
        } else {
            allBubbles[i].style.animationDuration = `0.5s`
        }
    }
})


/*//*------  SLOWER BUTTON ------
 *  Works exact same as "FASTER" button
    except that it adds time to the duration
    instead of subtracting it.
    Max "slowness": 20 seconds.
 */

const slower = document.getElementById('slower');

slower.addEventListener('click', () => {
    let allBubbles = document.getElementsByClassName('bubble');
    for (let i = 0; i < allBubbles.length; i++) {
        let speed = allBubbles[i].style.animationDuration;
        let oldSpeed = parseFloat(speed);
        let newSpeed = oldSpeed + 0.5;
        allBubbles[i].style.removeProperty("animation-duration");
        if (newSpeed < 20) {
            allBubbles[i].style.animationDuration = `${newSpeed}s`; 
        } else {
            allBubbles[i].style.animationDuration = `20s`
        }
    }
})

/**
 ** ------   BIGGER BUTTON    ------
 */

 const bigger = document.getElementById('bigger');

 bigger.addEventListener('click', () => {
     resetBubble();
     resetMain();
     document.querySelectorAll('.bubble').forEach(bubble => {
         bubble.classList.toggle('bigger');
     });
     document.getElementById('main').classList.toggle('bigger');
 })

/**
 ** ------   FANCY BUTTON    ------
 */
const fancy = document.getElementById('fancy');

fancy.addEventListener('click', () => {
    resetBubble();
    resetMain();
    document.querySelectorAll('.bubble').forEach(bubble => {
        // resetFancy();
        bubble.classList.toggle('hat');
    })
})

/**
 ** ------   GOTH BUTTON    ------
 */

const goth = document.getElementById('goth');
   
goth.addEventListener('click', () => {
    resetBubble();
    resetMain();
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.classList.toggle('goth');
    });
    document.getElementById('main').classList.toggle('goth');
})

/**
 ** ------   DISCO BUTTON    ------
 */

const disco = document.getElementById('disco');

disco.addEventListener('click', () => {
    resetBubble();
    resetMain();
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.classList.toggle('disco');
    });
    document.getElementById('main').classList.toggle('disco');
})



/**
 * ------   Reset functions -------
 */

function resetBubble () {
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.classList.remove('hat'); 
        bubble.classList.remove('goth'); 
        bubble.classList.remove('disco');  
        bubble.classList.remove('bigger');
    }
)}

function resetMain () {
    document.getElementById('main').classList.remove('bigger');
    document.getElementById('main').classList.remove('hat');
    document.getElementById('main').classList.remove('disco');
    document.getElementById('main').classList.remove('goth');
}


/**     NOTE:
 * !    What's up with the EXTRABUBBLE class?
 * 
 *      Clicking the "MORE BUBBLES" button without this extended class
 *      made a duplicate of the previous added class instead of just adding 5 more.
 * 
 *      For example:
 *      (Letters represent indivudual bubbles)
 * 
 *      ON LOAD [5 total]:          A B C D E
 *      ONE CLICK [15 total]:       A B C D E   A B C D E   F G H I J
 *      TWO CLICKS [30 total]:      A B C D E   A B C D E   F G H I J   A B C D E   F G H I J   K L M N O
 *     
 *      By extending the class and using "super" to copy methods,
 *      the functon creates and pushes unique bubbles to the 
 *      Bubble class and bubbles array.
 * 
 */