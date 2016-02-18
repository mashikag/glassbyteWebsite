function isAnimationEnded(element){
    var anim;
    var animations = {
      'animation':'transitionend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    }

    for(anim in animations){
        if( element.style[anim] !== undefined ){
            return anim[t];
        }
    }
}

function initIntro(){
  /*Get elements to be checked*/
  var topCurtainEl = document.getElementsByClassName('curtain top-curtain')[0];
  var bottomCurtainEl = document.getElementsByClassName('curtain bottom-curtain')[0];

  /* Listen for a transition! */
  var curtainUpEvent = isAnimationEnded(topCurtainEl);
  var curtainDownEvent = isAnimationEnded(bottomCurtainEl);

  /*Set up listeners*/
  curtainUpEvent && e.addEventListener(curtainUpEvent, function() {
    console.log('Curtain up complete!  This is the callback, no library needed!');
  });
  curtainDownEvent && e.addEventListener(curtainDownEvent, function() {
    console.log('Curtain down!');
  });
}

$(window).ready(initIntro());