class DaySerializer < ActiveModel::Serializer
  attributes :day
  has_many :calendar_notes
end
