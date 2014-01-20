class CreateTextNotes < ActiveRecord::Migration
  def change
    create_table :text_notes do |t|
      t.belongs_to :day
      t.text :note
      t.integer :x_pos
      t.integer :y_pos
      t.string :html_identifier
      t.float :rot
    end
  end
end
