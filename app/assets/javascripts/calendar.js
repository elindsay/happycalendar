$.happy_calendar = {
  month_num_to_word: function(month_num){
    switch(month_num)
      {
        case 0:
          return "January";
        case 1:
          return "February";
        case 2:
          return "March";
        case 3:
          return "April";
        case 4:
          return "May";
        case 5:
          return "June";
        case 6:
          return "July";
        case 7:
          return "August";
        case 8:
          return "September";
        case 9:
          return "October";
        case 10:
          return "November";
        case 11:
          return "December";
      }
  },
  day_num_to_short_word: function(day_num){
    switch(day_num)
      {
        case 0:
          return "sun";
        case 1:
          return "mon";
        case 2:
          return "tue";
        case 3:
          return "wed";
        case 4:
          return "thur";
        case 5:
          return "fri";
        case 6:
          return "sat";
      }
  },
  clear_days: function(){
    $(".week .num").html("");
    $(".split").removeClass("split");
    $(".used").removeClass("used");
    $("[class*='day_num_']").removeClass(function( index, css ) {
      return (css.match (/\bday_num_\S+/g) || []).join(' ');
    });
  },
  set_day: function(week, day, date){
    if(week <= 5){
      $(".week_" + week + " ." + day + " .num").html(date);
      $(".week_" + week + " ." + day).addClass("used");
      $(".week_" + week + " ." + day).addClass("day_num_"+date);
    }else{
      $(".week_5 ." + day).addClass("split");
      $(".week_5 ." + day + " .split_num").html(date);
    }
  },
  set_background: function(month){
    $("#universe").removeClass("summer")
    $("#universe").removeClass("winter")
    $("#universe").removeClass("spring")
    $("#universe").removeClass("autumn")
    if(month === 11 || month <= 1){
      $("#universe").addClass("winter");
    }else if(month <= 4){
      $("#universe").addClass("spring");
    }else if(month <= 7){
      $("#universe").addClass("summer");
    }else if(month <=10){
      $("#universe").addClass("autumn");
    }
  },
  set_calendar: function(month, year){
    var first_day = new Date(year, month, 1);
    var offset = first_day.getDay();
    var last_day = new Date(year, month + 1, 0);

    $.happy_calendar.set_background(month)
    $(".month").html($.happy_calendar.month_num_to_word(month));
    $(".year").html(year);

    $.happy_calendar.clear_days();
    for (i = 0; i < last_day.getDate(); i++){
      week = Math.floor((i + offset)/7) + 1;
      day = $.happy_calendar.day_num_to_short_word((i+offset)%7);
      $.happy_calendar.set_day(week, day, i + 1);
    }
  },
  ready: function(){
    var current_date = new Date();
    var month = current_date.getMonth();
    var year = current_date.getFullYear();
    var calendar_id = $(".calendar_show").data('id');
    if($(".calendar_show").length > 0){
      $.happy_calendar.set_calendar(month, year);
    }

    $(".month_year .backward").on("click", function(){
      month = month - 1;
      if (month < 0){
        month = 11;
        year = year - 1;
      }
      $.happy_calendar.set_calendar(month, year);
    });
    $(".month_year .forward").on("click", function(){
      month = month + 1;
      if (month > 11){
        month = 0;
        year = year + 1;
      }
      $.happy_calendar.set_calendar(month, year);
    });

    $.ajax({
      url: "/days/",
      data: {calendar_id: calendar_id, month: month},
      success: function(data){
        console.log(data);
        for(var j in data['days']){
          $(".day_num_"+data['days'][j]['day']).addClass("has_notes")
           for(var k in data['days'][j]['text_notes']){
            if(k == 0){
              $(".day_num_"+data['days'][j]['day']).append("<div class='notelets first'>"+data['days'][j]['text_notes'][k]['note']+"</div>")
            }else if (k <=3){
              $(".day_num_"+data['days'][j]['day']).append("<div class='notelets'>"+data['days'][j]['text_notes'][k]['note']+"</div>")
            }
           }
          if( data['days'][j]['text_notes'].length > 4){
            $(".day_num_"+data['days'][j]['day']).append("<div class='notelets elip'>...</div>")
          }
        };

      }
    });

    $("audio").each(function(index, audio_elt){
      audio_elt.volume = 0.3;
    });
    $(".day").on("mouseenter", function(){
      if ($(this).hasClass("used")){
        $(".click_"+(Math.floor(Math.random()*3)+1)).trigger("play");
      }
    });
    $(".day").on("click", function(){
      var month = $(".month_year .month").html();
      var year = $(".month_year .year").html();
      var day = $(this).find(".num").html();
      if ($(this).hasClass("used")){
        window.location = "/calendar/"+calendar_id+"/day/"+month+"/"+day+"/"+year;
      }
    });
  }
};

$(document).ready(function(){
  $.happy_calendar.ready();
});
$(document).on('page:load', $.happy_calendar.ready);
