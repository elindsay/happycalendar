class AddImageToStickers < ActiveRecord::Migration
  def change
    add_column :stickers, :image, :string
  end
end
