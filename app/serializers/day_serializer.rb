class DaySerializer < ActiveModel::Serializer
  attributes :day
  has_many :text_notes
end
