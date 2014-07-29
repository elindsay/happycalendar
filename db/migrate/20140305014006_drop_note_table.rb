class DropNoteTable < ActiveRecord::Migration
  def up
    drop_table :notes
  end

  def down
    create_table :notes do |t|
      t.text :note
      t.integer :x_pos
      t.integer :y_pos
      t.float :rot
      t.string :html_identifier
      t.timestamps
    end
  end
end
