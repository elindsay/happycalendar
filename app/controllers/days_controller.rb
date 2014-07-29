class DaysController < ApplicationController

  def index
    @days = Day.find(:all, conditions: { calendar_id: params[:calendar_id], month: params[:month], year: params[:year] })
    respond_to do |format|
      format.json { render json: @days}
    end
  end

  def show
    @day = Day.find(params[:id])
    redirect_to "/calendar/#{@day.calendar_id}/day/#{@day.month_text}/#{@day.day}/#{@day.year}"
  end
  
  def edit
    calendar_id = params[:calendar_id]
    month_number = Day.month_number(params[:month])
    year = params[:year]
    day = params[:day]
    @day = Day.find_or_create_by(calendar_id: calendar_id, month: month_number, year: year, day: day)
    @stickers = Sticker.all
    @day_stickers = @day.day_stickers.to_a
  end

  def update
    @day = Day.find(params[:id])
    @calendar_note = @day.calendar_notes.find_or_create_by(html_identifier: params[:calendar_note_params][:html_identifier])
    logger.debug("%"*30)
    logger.debug(@calendar_note)
    @calendar_note.update_attributes(params[:calendar_note_params].permit(:x_pos, :y_pos, :note, :html_identifier))
    respond_to do |format|
      format.json { render json: { identifier: @calendar_note.html_identifier } }
    end
  end
end
