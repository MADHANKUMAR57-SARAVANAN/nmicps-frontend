function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  jQuery("path[id^=injs]").each(function (i, e) {
    inaddEvent( jQuery(e).attr("id"));
  });
});
function inaddEvent(id,relationId) {
  var _obj = jQuery("#" + id);
  var arr = id.split("");
  var _Textobj = jQuery("#" + id + "," + "#injsvn" + arr.slice(4).join(""));
  jQuery("#" + ["visnames"]).attr({"fill":injsconfig.general.visibleNames});
  _obj.attr({"fill":injsconfig[id].upColor, "stroke":injsconfig.general.borderColor});
  _Textobj.attr({"cursor": "default"});
  if (injsconfig[id].active === true) {
    _Textobj.attr({"cursor": "pointer"});
    _Textobj.hover(function () {
      jQuery("#injstip").show().html(injsconfig[id].hover);
      _obj.css({"fill":injsconfig[id].overColor});
    }, function () {
      jQuery("#injstip").hide();
      jQuery("#" + id).css({"fill":injsconfig[id].upColor});
    });
    if (injsconfig[id].target !== "none") {
      _Textobj.mousedown(function () {
        jQuery("#" + id).css({"fill":injsconfig[id].downColor});
      });
    }
    _Textobj.mouseup(function () {
      jQuery("#" + id).css({"fill":injsconfig[id].overColor});
      if (injsconfig[id].target === "new_window") {
        window.open(injsconfig[id].url);	
      } else if (injsconfig[id].target === "same_window") {
        window.parent.location.href = injsconfig[id].url;
      } else if (injsconfig[id].target === "modal") {
        jQuery(injsconfig[id].url).modal("show");
      }
    });
    _Textobj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#injstip").outerWidth(), tiph =jQuery("#injstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#injstip").css({left: x, top: y});
    });
     // _Textobj.click(function (e) {
     //  var _id = e.target.id;
     //   var arr = _id.split("");
     //  // console.log(jQuery("#injsvn" + arr.slice(4)).attr('data'));
     // jQuery("#injsvn" + arr.slice(4)).trigger('click');

     //  console.log("TEST");
     // });
    if (isTouchEnabled()) {
      _Textobj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw =jQuery("#injstip").outerWidth(), tiph =jQuery("#injstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#" + id).css({"fill":injsconfig[id].downColor});
        jQuery("#injstip").show().html(injsconfig[id].hover);
        jQuery("#injstip").css({left: x, top: y});
      });
      _Textobj.on("touchend", function () {
        jQuery("#" + id).css({"fill":injsconfig[id].upColor});
        if (injsconfig[id].target === "new_window") {
          window.open(injsconfig[id].url);
        } else if (injsconfig[id].target === "same_window") {
          window.parent.location.href = injsconfig[id].url;
        } else if (injsconfig[id].target === "modal") {
          jQuery(injsconfig[id].url).modal("show");
        }
      });
    }
	}
}