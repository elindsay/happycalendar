$.happy_day = {
  ready: function(){

    $(".canvas").on("click", function(event){
      var now = $.now();
      var canvasX = $(this).position().left, canvasY = $(this).position().top;
      var pageX = event.pageX, pageY = event.pageY;
      var relX = pageX - canvasX, relY = pageY - canvasY;
      if ($(":focus").length === 0){
        $(".canvas").append("<textarea class='text created_"+now+" x_"+relX+" y_"+relY+"'></textarea>");
        var current_text = $(".created_"+now);
        current_text.focus();
        current_text.css("left", relX+"px");
        current_text.css("top", relY+"px");
        current_text.css("width", 950-relX+"px");
        current_text.autosize();
        current_text.on("blur", function(){
          if(current_text.val() === ""){
            current_text.remove();
          }
        });
      }
    });
  }
}
$(document).ready(function(){
  $.happy_day.ready()
});
$(document).on('page:load', $.happy_day.ready);
