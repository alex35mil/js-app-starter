"use strict";

import $          from 'jquery';
import animate    from '../helpers/animation';
import                 '../helpers/center';

export default function() {

  var $promo = $('#promo'),
      $logo  = $('#promo__logo');

  $promo.center();
  $logo.on('click', () => {
    animate({
      element   : $logo,
      animation : 'tada'
    });
  });

}
