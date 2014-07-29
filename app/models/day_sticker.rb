class DaySticker < ActiveRecord::Base
  belongs_to :day
  belongs_to :sticker
  validates_presence_of :sticker
  validates :x_pos, :y_pos, numericality: { only_integer: true}, presence: true 
end
