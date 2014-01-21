class CreateCalendarNotes < ActiveRecord::Migration
  def change
    create_table :calendar_notes do |t|
      t.belongs_to :day
      t.text :note
      t.integer :x_pos
      t.integer :y_pos
      t.string :html_identifier
      t.float :rot
      t.timestamps
    end
  end
end
