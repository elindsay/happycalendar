class Day < ActiveRecord::Base
  belongs_to :calendar
  has_many :calendar_notes, order: "y_pos DESC"

  def Day.month_number(month_text)
    case month_text
    when "January"
      0
    when "February"
      1
    when "March"
      2
    when "April"
      3
    when "May"
      4
    when "June"
      5
    when "July"
      6
    when "August"
      7
    when "September"
      8
    when "October"
      9
    when "November"
      10
    when "December"
      11
    else
      "Error"
    end
  end

  def month_text
    case month
    when 0
      "January"
    when 1
      "February"
    when 2
      "March"
    when 3
      "April"
    when 4
      "May"
    when 5
      "June"
    when 6
      "July"
    when 7
      "August"
    when 8
      "September"
    when 9
      "October"
    when 10
      "November"
    when 11
      "December"
    else
      "Error"
    end
  end
end
