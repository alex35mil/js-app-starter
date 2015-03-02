"use strict";

import $ from 'jquery';

export default $.fn.center = function() {

  this.css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  });

  return this;

};
