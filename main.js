//Create Function 
const main = (btn, mainContainer, config) => {
    //Set Values
    const actionBtn = btn;
    const container = mainContainer;
    const { onRevealEnd } = config;
    const initialRedius = 10;

    //Set Data Value
    let isMenuOpen = false;
    let reqId = null;
    let targetRadius = initialRedius;
    let elementRadius = targetRadius;

    //Set Clip Path By CLick
    const initRevealBlock = () => {
        mainContainer.style.clipPath = 'circle(var(--radius) at calc(100% - 50px) 45px)';
        container.style.setProperty('--radius', `${initialRedius}px`);
        container.setAttribute('data-active', true);
    };

    //Set Radius
    const getTargetRadius = inMenuOpen => {
        return inMenuOpen ? getMinimumRadius() : initialRedius;
    };

    //Set MinimumRadius
    const getMinimumRadius = () => {
        const { innerHeight, innerWidth } = window;

        return Math.sqrt(innerHeight ** 2 + innerWidth ** 2);
    }

    //Animation
    const animationStart = () => {
        elementRadius += (targetRadius - elementRadius) * 0.08;
        container.style.setProperty('--radius', `${elementRadius}px`);

        reqId = requestAnimationFrame(animationStart);

        // some bug with smal black point
        const isStopAnimation = isMenuOpen ? elementRadius > targetRadius : Math.round(elementRadius) === Math.round(targetRadius);
        if (isStopAnimation) {
            onRevealEnd();
            animationStop();
        }
    };

    //Now We Create AnimationStop
    const animationStop = () => {
        cancelAnimationFrame(reqId);
        reqId = null;
    };

    //OnReveal
    const onReveal = () => {
        isMenuOpen = !isMenuOpen;
        actionBtn.setAttribute('data-open', isMenuOpen);
        targetRadius = getTargetRadius(isMenuOpen);
        animationStart();
    };

    initRevealBlock();
    actionBtn.addEventListener('click', onReveal);
}

//Now Content Load 
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.nav-btn-js');
    const mainContainer = document.querySelector('.nav-js');
    const config = {
        //Call Function
        onRevealEnd() {
            console.log('end');
        },
    };

    //Call Main Function
    main(btn, mainContainer, config);
});


