class DayStickersController < ApplicationController
  def new
    @daysticker = DaySticker.new
  end

  def create
    @daysticker = DaySticker.new(day_sticker_params)
    if @daysticker.save
      respond_to do |format|
        format.js { render json: {status: :ok} }
        format.html { redirect_to day_path(id: params[:day_sticker][:day_id]) }
      end
    else
      respond_to do |format|
        format.js { render json: {error: @daysticker.errors.full_messages, status: 422} }
        format.html { render :new }
      end
    end
  end

  def edit
    @daysticker = DaySticker.find(params[:id])
  end

  def update
    @daysticker = DaySticker.find(params[:id])
    if @daysticker.update(day_sticker_params)
      respond_to do |format|
        format.js {render json: {status: :ok}}
        format.html {redirect_to day_path(id: params[:day_sticker][:day_id])}
      end
    else
      respond_to do |format|
        format.js { render json: {error: @daysticker.errors.full_messages, status: 422} }
        format.html {render :edit}
      end
    end
  end

  private
  def day_sticker_params
    params.require(:day_sticker).permit(:day_id, :sticker_id, :y_pos, :x_pos)
  end
end
