class CreateCalandars < ActiveRecord::Migration
  def change
    create_table :calendars do |t|
      t.string :name
      t.belongs_to :user
      t.timestamps
    end
  end
end
