/**=============================================================
* 
**                          CLASSES
*
*=============================================================*/

/** ---------------------------------------------------------------------------
 * *----------------------------  BUBBLE  -------------------------------------
 * 
 * For indivudal attributes assigned to each bubble:
 *  @param  x       Where bubble appears across x-axis of width
 *  @param  delay   Stagger entrance so new bubbles appear at different times
 *  @param  rate    Rate of speed bubble moves to top
 *  @param  scale   Transform size of the bubbles toward the top of screen
 *  @param  size    Vary the size of the bubbles  
 *   ----------------------------------------------------------------------------    */


class Bubble {
    constructor (x, delay, rate, scale, size) {
        this.x = x;
        this.delay = delay;
        this.rate = rate;
        this.scale = scale;
        this.size = size;
    }
}

/** -----------------------------------------------------------------------------
 * *---------------------------  MULTIBUBBLE ------------------------------------
 *   -----------------------------------------------------------------------------*/

class Multibubble {
    constructor() {
        this.bubbles = [];
        this.makeBubble();
        this.render();
    }
    //  Function adds 5 individualized bubbles, push to this.bubbles array
    makeBubble() {
        //  Array to iterate for 5 unique bubbles
        let bubbleDivs = ['bubble1', 'bubble2', 'bubble3', 'bubble4', 'bubble5'];
        for (let i = 0; i < bubbleDivs.length; i++) {
            let moveX = Math.floor(Math.random() * 100);
            let wait = Math.floor(Math.random() * 5);
            let speed = Math.floor(Math.random() * (6 - 3 + 1)) + 1;
            let scales = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5];
            let randomScale = scales[Math.floor(Math.random() * scales.length)];
            let sizes = [25, 50, 75, 100, 125];
            let randomSize = sizes[Math.floor(Math.random() * sizes.length)]

            //  Assign to Bubble class values
            Bubble.x = moveX;
            Bubble.delay = wait;
            Bubble.rate = speed;
            Bubble.scale = randomScale;
            Bubble.size = randomSize;

            //  Push to bubbles array
            this.bubbles.push(new Bubble(moveX, wait, speed, randomScale, randomSize)); 
        }
           
    }
    //  Add to the DOM
    render() {
        for (let i = 0; i < this.bubbles.length; i++) {
            let div = document.createElement('div');
            div.classList = 'bubble'; 
            document.getElementById('main').appendChild(div);

            let enter = this.bubbles[i].x;
            div.style.left = enter + "%";

            let quick = this.bubbles[i].rate;
            div.style.animationDuration = quick + "s";

            let stagger = this.bubbles[i].delay;
            div.style.animationDelay = stagger + "s";

            let scaleUpDown = this.bubbles[i].scale;
            div.style.transform = "translateY(-100%) scale("+ scaleUpDown + ")";

            let widthHeight = this.bubbles[i].size;
            div.style.width = widthHeight + "px";
            div.style.height = widthHeight + "px";

            //Match new bubbles to existing class on other bubbles
            const mainClass = document.getElementById('main').classList;
            
            if (mainClass == 'main bigger') {
                div.classList.toggle('bigger');
            };
            if (mainClass == 'main goth') {
                div.classList.toggle('goth');
            };
            if (mainClass == 'main disco') {
                div.classList.toggle('disco');
            };
            if (mainClass == 'main fancy') {
                div.classList.toggle('fancy');
            };
        } 
    }      
}

/** -----------------------------------------------------------------------
 * *-----------------------------  EXTRABUBBLE ----------------------------
 * 
 * Extends the Multibubble class so the factory doesn't
 * repeat the previous values when adding on
 * more bubbles with the "MORE BUBBLES" button.
 * See note at bottom of doc for details.
 * 
 *-------------------------------------------------------------------------*/

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

//--------------------------------------------------------------------------------------------------

/**============================================================
* 
**              HTML LINKS & EVENT LISTENERS
*
*=============================================================*/

//--------------------------------------------------------------------------------------------------


// **--------  GLOBAL VARIABLES & FUNCTIONS ----------

const main = document.getElementById('main');

//  Toggle on/off element's class

function toggleBubbles(elem) {
    document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.classList.toggle(elem);
    });
}

//  Remove classes not on element

function removeClass(elem) {
    main.classList.remove(elem);
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.classList.remove(elem)});
    }
//------------------------------------------------------------------------------------------------

// **--------  MORE BUBBLES button ------

const bubbleButton = document.getElementById('more_bubbles');

bubbleButton.addEventListener('click', () => {
    const extra = new Extrabubble;
})

//------------------------------------------------------------------------------------------------

// **------  FASTER button ------

//  Can't toggle class like most buttons because it needs to 
//  increase every single click

const faster = document.getElementById('faster');

faster.addEventListener('click', () => {
    //  Declare all appended children with class "bubble"
    let allBubbles = document.getElementsByClassName('bubble');

    for (let i = 0; i < allBubbles.length; i++) {
        let speed = allBubbles[i].style.animationDuration;

        let oldSpeed = parseFloat(speed);
        let newSpeed = oldSpeed - 0.5;

        allBubbles[i].style.removeProperty("animation-duration");
        if (newSpeed > 0.6) {
            allBubbles[i].style.animationDuration = newSpeed + "s"; 
        } else {
            //  cap speed at half a second
            allBubbles[i].style.animationDuration = "0.5s"
        }
    }
})
//------------------------------------------------------------------------------------------------

//*   SLOWER BUTTON 
//    Works exact same as "FASTER" button except that it adds time to the duration
//  instead of subtracting it. Max "slowness": 20 seconds.


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
//------------------------------------------------------------------------------------------------

//** ------   BIGGER BUTTON    ------

 const bigger = document.getElementById('bigger');

 bigger.addEventListener('click', () => {
    toggleBubbles('bigger');
    main.classList.toggle('bigger');
 })
//------------------------------------------------------------------------------------------------

//** ------   GOTH BUTTON    ------

const goth = document.getElementById('goth');
   
goth.addEventListener('click', () => {
    removeClass('fancy');
    removeClass('disco');
    toggleBubbles('goth');
    main.classList.toggle('goth');
})
//------------------------------------------------------------------------------------------------

//** ------   DISCO BUTTON    ------

const disco = document.getElementById('disco');

disco.addEventListener('click', () => {
    removeClass('goth');
    removeClass('fancy');
    toggleBubbles('disco');
    main.classList.toggle('disco');
})
//------------------------------------------------------------------------------------------------

//** ------   FANCY BUTTON    ------

const fancy = document.getElementById('fancy');

fancy.addEventListener('click', () => {
    removeClass('goth');
    removeClass('disco');
    toggleBubbles('fancy');
    main.classList.toggle('fancy');
})
//------------------------------------------------------------------------------------------------

//* *------  RESET button to clear screen  ------

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
   let bubbleField = document.getElementsByClassName('bubble');
   //   Iterate and remove each child
   for (let i = bubbleField.length - 1; i >= 0; i--) {
       let pop = bubbleField[i];
       main.removeChild(pop);
       main.className = 'main';
   }
   const resetBubbles = new Extrabubble;
})
//------------------------------------------------------------------------------------------------


    
//===================================================================================================
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