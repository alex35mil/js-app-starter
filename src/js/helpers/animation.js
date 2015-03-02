"use strict";

import $ from 'jquery';

export default function(params) {

  var $el = typeof params.element === 'string' ? $(params.element) : params.element;

  var _animation = params.animation + ' animated',
      _animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  $el.removeClass(_animation)
     .addClass(_animation)
     .one(_animationEndEvents, function() {
        $(this).removeClass(_animation);
        if (params.cb) params.cb();
      }
  );

}
