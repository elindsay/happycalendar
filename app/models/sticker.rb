class Sticker < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
