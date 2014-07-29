class CreateDayStickersTable < ActiveRecord::Migration
  def change
    create_table :day_stickers do |t|
      t.integer :day_id
      t.integer :sticker_id
      t.integer :y_pos
      t.integer :x_pos
      t.timestamps
    end
  end
end
