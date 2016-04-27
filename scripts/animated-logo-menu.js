var DEF_BOX_WIDTH = 300;
	var DEF_BOX_HEIGHT = DEF_BOX_WIDTH;
	var LOGO_MENU_MARGIN_PERCENTS = 0.10; 
	var MAX_LOGO_MENU_WRAPPER_WIDTH = Math.floor(4 * DEF_BOX_WIDTH);
	var MAX_LOGO_MENU_WRAPPER_HEIGHT = Math.floor(DEF_BOX_HEIGHT + DEF_BOX_HEIGHT/3);
    var FONT_BOX_HEIGHT_RATIO = 1/10;
    var currentBoxWidth = DEF_BOX_WIDTH;
	var currentLogoMenuWrapperWidth = MAX_LOGO_MENU_WRAPPER_WIDTH;
	var currentLogoMenuWrapperHeight = MAX_LOGO_MENU_WRAPPER_HEIGHT;
    var currentFontSize = Math.floor(DEF_BOX_WIDTH * FONT_BOX_HEIGHT_RATIO);
	
	var showMenu = false;
	function restartMenuAnimation(ev){
		if (showMenu && ev == "mouseleave" || !showMenu && ev == "mouseover") {
			showMenu = !showMenu;
			
      refreshBoxElements();
      
      refreshMenuLabelsElements();
			
			console.log("restartMenuAnimation");
		}
	}
  
  /*for animation restart*/
  function refreshBoxElements(){
    var boxCount = 8;
    var imgSrc = "logo/box-300px.png";
    if (showMenu) {
      for ( i = 1; i <= boxCount; i++) {
        var newEl = document.createElement("img");
        newEl.src = imgSrc;
        newEl.className += ' menu-box';
        newEl.className += ' menu-box' + i;
        newEl.className += ' show-menu-box' + i;
        $(newEl).css({"width":String(currentBoxWidth),"height":"auto"});
        var el = document.getElementsByClassName("menu-box menu-box"+i)[0];
        console.log(newEl + "\n" + el);
        el.parentNode.replaceChild(newEl, el);
      }
    } else {
      for ( i = 1; i <= boxCount; i++) {
        var newEl = document.createElement("img");
        newEl.src = imgSrc;
        newEl.className += ' menu-box';
        newEl.className += ' menu-box' + i;
        newEl.className += ' hide-menu-box' + i;
        $(newEl).css({"width":String(currentBoxWidth),"height":"auto"});
        var el = document.getElementsByClassName("menu-box menu-box"+i)[0];
        console.log(newEl + "\n" + el);
        el.parentNode.replaceChild(newEl, el);
        
      }
    }
  }
  
  /*for animation restart*/
  function refreshMenuLabelsElements(){
    console.log("refreshMenuLabelsElements() Refreshing menu labels elements.");
    
    var menuItems = 
      [
        "menu-item-middle-right",
        "menu-item-middle-left",
        "menu-item-west-right",
        "menu-item-west-left",
        "menu-item-east-right",
        "menu-item-east-left"
      ];
      
    var menuItemLabels = 
      [
        "Products",
        "About",
        "Contact"
      ];
      
    var labelIndex = 0;
    
    if (showMenu) {
      for (menuItem of menuItems) { 
        (function () {
          /*Create new menu item element that will replace the old one to restart the animation*/
          var newMenuItemEl = document.createElement("MENUITEM");
          var currentLabel = menuItemLabels[Math.floor(labelIndex/2)];
          newMenuItemEl.label = currentLabel;
          newMenuItemEl.className += ' menu-item';
          newMenuItemEl.className += ' show-' + menuItem;
          newMenuItemEl.className += ' slide-up';
          $(newMenuItemEl).css("font-size",String(currentFontSize)+"px");
          newMenuItemEl.addEventListener(
            'click',
            function(){
              $('html, body').animate(
                { scrollTop: $("#" + currentLabel.toLowerCase()).offset().top }, 
                2000
              );
            }
          );
          newMenuItemEl.appendChild(document.createTextNode(currentLabel));
          
          /*Create new menu item element that will replace the old one to restart the animation*/
          var curMenuItemEl = document.getElementsByClassName("hide-" + menuItem)[0];
          curMenuItemEl.parentNode.replaceChild(newMenuItemEl, curMenuItemEl);
          
          console.log("refreshMenuLabelsElements() Replaced  " + menuItem + " - label: " + currentLabel);
          
          labelIndex++;
        })();
      }
    }
    else {
      for (menuItem of menuItems) {
        /*Create new menu item element that will replace the old one to restart the animation*/
        var newMenuItemEl = document.createElement("menuitem");
        var currentLabel = menuItemLabels[Math.floor(labelIndex/2)];
        newMenuItemEl.label = currentLabel;
        newMenuItemEl.className += ' menu-item';
        newMenuItemEl.className += ' hide-' + menuItem;
        newMenuItemEl.className += ' slide-down';
        $(newMenuItemEl).css("font-size",String(currentFontSize)+"px");
        newMenuItemEl.appendChild(document.createTextNode(currentLabel));
        
        /*Create new menu item element that will replace the old one to restart the animation*/
        var curMenuItemEl = document.getElementsByClassName("show-" + menuItem)[0];
        curMenuItemEl.parentNode.replaceChild(newMenuItemEl, curMenuItemEl);
        
        console.log("refreshMenuLabelsElements() Replaced  " + menuItem + " - label: " + currentLabel);
        
        labelIndex++;
      }
    }
  }

  function adjustLogoMenuSize(){
    /*
      -check window.innerheight and .innerwidth
      -based on these set the size of box images and the font
    */
    console.log("adjustLogoMenuSize() Function entered.");
	console.log("currentLogoMenuWrapperHeight: "+currentLogoMenuWrapperHeight);
	console.log("currentLogoMenuWrapperWidth: "+currentLogoMenuWrapperWidth);
    
    var windowWidth = $(window).width();
    
    console.log("Window width: " + windowWidth);
	
	var currentPaddingPx = getTotalPaddingPx(currentLogoMenuWrapperWidth, LOGO_MENU_MARGIN_PERCENTS);
	if (
		((currentLogoMenuWrapperWidth + currentPaddingPx) > windowWidth) || 
		(((currentLogoMenuWrapperWidth + currentPaddingPx)<windowWidth) && (currentLogoMenuWrapperWidth < MAX_LOGO_MENU_WRAPPER_WIDTH))
		)
	{
		console.log("menulogo needs resizing.");
		var newSideMarginsPx = getTotalPaddingPx(windowWidth, LOGO_MENU_MARGIN_PERCENTS);
		var newLogoMenuWrapperWidth = windowWidth - newSideMarginsPx;
		var newBoxWidth = Math.floor(newLogoMenuWrapperWidth/4);
		var newBoxHeight = newBoxWidth;
		var newLogoMenuWrapperHeight = Math.floor(newBoxHeight + newBoxHeight/3);
        var newFontSize = Math.floor(newBoxHeight*FONT_BOX_HEIGHT_RATIO);

        $('.menu-box').css(
            {
                "width":String(newBoxWidth)+"px",
                "height":"auto"
            }
        );
        $('#menu-wrapper').css(
            {
                "width":String(newLogoMenuWrapperWidth)+"px",
                "height":String(newLogoMenuWrapperHeight)+"px"
            }
        );
        $('.menu-item').css("font-size",String(newFontSize)+"px");

		currentLogoMenuWrapperWidth = newLogoMenuWrapperWidth;
		currentLogoMenuWrapperHeight = newLogoMenuWrapperHeight;
        currentBoxWidth = newBoxWidth;
        currentFontSize = newFontSize;

        console.log("currentfontsize: "+currentFontSize);
	}
  }
  
  
  function getTotalPaddingPx(size, paddingPercent){return Math.floor(size*paddingPercent);}
  
  $(window).load(adjustLogoMenuSize);
  $(window).resize(adjustLogoMenuSize);
  