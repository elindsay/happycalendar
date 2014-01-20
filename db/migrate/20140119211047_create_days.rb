class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.belongs_to :user
      t.belongs_to :calendar
      t.integer :month
      t.integer :day
      t.integer :year
      t.timestamps
    end
  end
end
