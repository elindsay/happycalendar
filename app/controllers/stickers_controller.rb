class StickersController < ApplicationController
  def new
    @sticker = Sticker.new
  end

  def create
    @sticker = Sticker.new(sticker_params)
    if @sticker.save
      redirect_to @sticker, notice: "Sticker was successfully created."
    else
      render :new
    end
  end

  private

  def sticker_params
    params.require(:sticker).permit(:name, :image)
  end
end