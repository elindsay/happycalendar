$.happy_day = {
  ready: function(){
    if($(".day_edit").length === 1){
      $.happy_calendar.set_background($(".day_edit").data("month"));
      $(".canvas").on("click", function(event){
        var identifier = $.now();
        var canvasX = $(this).position().left, canvasY = $(this).position().top;
        var pageX = event.pageX, pageY = event.pageY;
        var relX = pageX - canvasX, relY = pageY - canvasY;
        var day_id = $(".day_edit").data('id');
        if ($("textarea.text:visible").length === 0){
          $(".canvas").append("<textarea class='text created_"+identifier+" x_"+relX+" y_"+relY+"'></textarea>");
          var current_text = $(".created_"+identifier);
          current_text.focus();
          current_text.css("left", relX+"px");
          current_text.css("top", relY+"px");
          current_text.css("width", 950-relX+"px");
          current_text.autosize();
          current_text.on("keyup", function(){
            $.ajax({
              type: "PUT",
              url: "/days/"+day_id,
              data: {identifier: identifier, text: current_text.val(), x: relX, y: relY}
            });
          });
          current_text.on("blur", function(){
            if(current_text.val() === ""){
              current_text.remove();
            }
          });
        }
      });
    }
  },
  setup_drag: function(){
    $('.draggable_text').draggable();
    $('.draggable_text').on('mouseup', function(event){
      console.log('mouse up');
      console.log(this);
      var day_id = $(".day_edit").data('id');
      var identifier = ($(this).data('identifier'));
      var relX = ($(this).css('left').slice(0,-2));
      var relY = ($(this).css('top').slice(0,-2));
      $.ajax({
        type: "PUT",
        url: "/days/"+day_id,
        data: {calendar_note_params: {html_identifier: identifier, x_pos: relX, y_pos: relY}}
      });
    });
    console.log("hi");
    $('.draggable_text').on('click', function(){
      console.log("clicked!");
      console.log(this);
      $(this).children('textarea.text').removeClass('hidden').focus();
      $(this).children('div.text').addClass('hidden');
    });
    $('textarea.text').on('focusout', function() {
      console.log('focused out');
      $(this).parent().focus();
      $(this).addClass('hidden');
      $(this).siblings().removeClass('hidden');
    });
    
    $('.draggable_sticker').draggable();
  },
}
$(document).ready(function(){
  $.happy_day.ready();
  $.happy_day.setup_drag();
});

$(document).on('page:load', $.happy_day.ready);
