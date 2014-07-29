$.happy_day = {
  ready: function(){
    if($(".day_edit").length === 1){
      $.happy_calendar.set_background($(".day_edit").data("month"));
      $(".canvas").on("click", function(event){
        var identifier = $.now();
        var canvasX = $(this).position().left, canvasY = $(this).position().top;
        var pageX = event.pageX, pageY = event.pageY;
        var relX = Math.round(pageX - canvasX), relY = Math.round(pageY - canvasY);
        var day_id = $(".day_edit").data('id');
        if ($("textarea.text:visible").length === 0){
          $(".canvas").append("<textarea class='text created_"+identifier+" x_"+relX+" y_"+relY+"'></textarea>");
          var current_text = $(".created_"+identifier);
          current_text.focus();
          current_text.css("left", relX+"px");
          current_text.css("top", relY+"px");
          //current_text.css("width", 950-relX+"px");
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
      $(this).children('.edit_text').removeClass('hidden').focus();
      $(this).children('div.text').addClass('hidden');
    });
    $('textarea.text').on('focusout', function() {
      console.log('focused out');
      $(this).parent().parent().focus();
      $(this).parent().addClass('hidden');
      $(this).parent().siblings('.text').removeClass('hidden');
    });
    $('.draggable_sticker').draggable({
      helper: 'clone', 
      revert: 'invalid'
    });
    $('.canvas').droppable({
      accept: '.draggable_sticker',
      drop: function(event, ui) {
        var sticker_clone = ui.draggable.clone();
        console.log(sticker_clone);
        sticker_clone.appendTo('.canvas');
        sticker_clone.removeClass('draggable_sticker').addClass('draggable_day_sticker');
        sticker_clone.draggable();

        var relY = Math.round(ui.offset.top - $(this).offset().top);
        var relX = Math.round(ui.offset.left - $(this).offset().left);
        sticker_clone.css({top: relY});
        sticker_clone.css({left: relX});
        sticker_clone.css({position: 'absolute'});
        console.log(relX);
        console.log(relY);
        var day_id = $('.day_edit').data('id');
        var sticker_id = sticker_clone.data('id');
        $.ajax({
          type: "POST",
          url: "/day_stickers/",
          data: {day_sticker: {day_id: day_id, sticker_id: sticker_id, x_pos: relX, y_pos: relY}},
          dataType: "json"
        }).done(function (message) {
          console.log(message);
          console.log('success');
        });
      }
    });
//    $('.draggable_sticker').draggable();
//    $('.draggable_sticker').on('mouseup', function() {
//      console.log('hello');
//      var day_id = $('.day_edit').data('id');
//      var sticker_id = $(this).data('id');
//      console.log(sticker_id);
//      var relX = ($(this).css('left').slice(0,-2));
//      var relY = ($(this).css('top').slice(0,-2));
//      $.ajax({
//        type:"POST",
//        url: "/day_stickers",
//        data: {day_sticker: {day_id: day_id, sticker_id: sticker_id, x_pos: relX, y_pos: relY}},
//        dataType: "json"
//        }).done(function (message){
//          console.log(message);
//          console.log("success");
//        });
//      });
    $('.draggable_day_sticker').draggable();
    $('.draggable_day_sticker').on('mouseup', function() {
      var day_sticker_id = $(this).data('id');
      var day_id = $('.day_edit').data('id');
      var relX = ($(this).css('left').slice(0,-2));
      var relY = ($(this).css('top').slice(0,-2));
      $.ajax({
         type: "PUT",
         url: "/day_stickers/" + day_sticker_id,
         data: {day_sticker: {day_id: day_id, x_pos: relX, y_pos: relY}},
         dataType: "json"
       });
    });
  },
}
$(document).ready(function(){
  $.happy_day.ready();
  $.happy_day.setup_drag();
});

$(document).on('page:load', $.happy_day.ready);

