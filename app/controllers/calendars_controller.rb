class CalendarsController < ApplicationController
  def index
    if current_user
      @calendars = current_user.calendars
    else
      @calendars = Calendar.all
    end
  end

  def new
    if current_user
      @calendar = Calendar.new
    else
      redirect_to :back, notice: "Must log in to create calendar"
    end
  end

  def create
    @calendar = Calendar.new(calendar_params)
    if @calendar.save
      redirect_to calendar_path(@calendar)
    else
      render :new
    end
  end

  def show
    @calendar = Calendar.find(params[:id])
    Day.all(include: "text_notes", conditions: ["days.calendar_id = ? AND text_notes.id IS NULL", @calendar.id]).each do |d|
      if d.text_notes.empty?
        d.delete
      end
    end
  end
  private

  def calendar_params
    params.require(:calendar).permit(:name, :user_id)
  end
end
