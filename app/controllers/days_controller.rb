class DaysController < ApplicationController
  def new
    month = params[:month]
    year = params[:year]
    day = params[:day]
    @day = Day.new(month: Day.month_number(month), year: year, day: day)
  end
end
