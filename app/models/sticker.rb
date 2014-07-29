class Sticker < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  has_many :day_stickers
end
