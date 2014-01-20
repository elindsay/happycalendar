class TextNote < ActiveRecord::Base
  belongs_to :day
  validates_presence_of :note, :x_pos, :y_pos
end
