const blockingTimeInMilliSeconds = 50;
const  sleep = async (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};
/**
 * Blocks the program till a specific event occurs, given by the parameter
 * its sort of thread.sleep for async functions
 * @param eventName that has to be triggered to release the block
 * */
 function Blocker(eventName){
    this.blocked = true;
    this.blockingTimeInMilliSeconds = blockingTimeInMilliSeconds;
    this.name = eventName;
    let tmp = this;
    document.addEventListener(eventName, function () {
        tmp.blocked = false;
    });
}

/** starts the blocking process
 */
Blocker.prototype.block =  async function block(){
    while(this.blocked){
        await sleep(this.blockingTimeInMilliSeconds);
    }
};
/** Adjust the sleep timer of the waiting function for a more sensitive but more blocking checking
 * @param milliSeconds time to look if the blocking is released
 */
Blocker.prototype.adjustBlockingTime = function(milliSeconds){
    this.blockingTimeInMilliSeconds = milliSeconds;
};

/** Creates an event with the given name and dispatches it
 * @param {string} eventName that should be triggered
 */
 function createBlockEvent(eventName){
    //use events package for node
    let event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    document.dispatchEvent(event);
}


/**
 * Calls async function to show threadlike blocking
 *
 */
async  function main(){
    console.log("before functions");
     func1();
     func2();
}

/**
 * gives the control after every output to func1 while waiting to get waked up from func1
 */
async function func2(){
    console.log("func2 first");
    let block = new Blocker("2_1");
    await block.block();
    createBlockEvent("1_1");
    console.log("func2 second");
    block = new Blocker("2_2");
    await block.block();
    createBlockEvent("1_2");
    console.log("func2 third");
    block = new Blocker("2_3");
    await block.block();
    createBlockEvent("1_3");
    console.log("func2 4th");
    block = new Blocker("2_4");
    await block.block();
    console.log("func2 5th");
    createBlockEvent("1_4");
}

/**
 * gives the control after every output to func2 while waiting to get waked up from func2
 */
async function func1(){
    console.log("func1 first");
    //both functions are blocked in the beginning, luckily there is the caLLback, waking the block on 2_1
    setTimeout(function(){
        createBlockEvent("2_1");
    }, 2000);
    let block = new Blocker("1_1");
    await block.block();
    createBlockEvent("2_2");
    console.log("func1 second");
    block = new Blocker("1_2");
    await block.block();
    createBlockEvent("2_3");
    console.log("func1 third");
    block = new Blocker("1_3");
    await block.block();
    createBlockEvent("2_4");
    console.log("func1 4th");
    block = new Blocker("1_4");
    await block.block();
    console.log("func1 5th")
}


main();