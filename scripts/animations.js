function isAnimationEnded(element){
    var anim;
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    }

    for(anim in animations){
        if( element.style[anim] !== undefined ){
            return animations[anim];
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
  
  var introWrapper = document.getElementById('intro-wrapper');

  /*Set up listeners*/
  curtainUpEvent && window.addEventListener(curtainUpEvent, function() {
    console.log('Curtain up complete!  This is the callback, no library needed!');
	introWrapper.style.visibility = 'hidden';
  });
  curtainDownEvent && window.addEventListener(curtainDownEvent, function() {
    console.log('Curtain down!');
	introWrapper.style.visibility = 'hidden';
  });
}

window.addEventListener("load", initIntro);