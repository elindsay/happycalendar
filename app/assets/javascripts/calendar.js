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
  },
  set_day: function(week, day, date){
    if(week <= 5){
      $(".week_" + week + " ." + day + " .num").html(date);
    }else{
      $(".week_5 ." + day).addClass("split");
      $(".week_5 ." + day + " .split_num").html(date);
    }
  },
  set_calendar: function(month, year){
    var first_day = new Date(year, month, 1);
    var offset = first_day.getDay();
    var last_day = new Date(year, month + 1, 0);

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
    $.happy_calendar.set_calendar(month, year);
    console.log(month);

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
  }
};

$(document).ready(function(){
  $.happy_calendar.ready();
});
$(document).on('page:load', $.happy_calendar.ready);