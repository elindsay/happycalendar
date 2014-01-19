class Calendar < ActiveRecord::Base
  belongs_to :user
  has_many :days
  validates_presence_of :name, :user
end
