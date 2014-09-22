(function(global){
  function FlashMessage(){
    var _$container;

    initialize.apply(this, arguments);

    return{
      destroy : destroy
    }

    function initialize(container, params){
      _$container = $(container);
      _flash(4000);
    }

    function _flash(ms){
      setTimeout(function(){
        _$container.css({
          '-webkit-transform': 'translate3d(0px,-66px,0px)',
          '-webkit-transition-duration': '0.5s'
        }).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
          function(){
            _$container.css('display', 'none');
          }
        );
      }, ms);
    }

    function destroy(){
    }
  }

  if(global.comp == null){
    global.comp = {};
  }

  global.comp.flash_message = FlashMessage;

})(window);