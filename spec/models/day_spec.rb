require 'spec_helper'

describe Day do
  it { should belong_to :calendar }
  it { should have_many :calendar_notes }
end


describe Day, ".calendar_notes" do
  let(:day)   { create :day }
  let(:note_1)   { create :calendar_note, day: day }
  let(:note_3)   { create :calendar_note, day: day }
  let(:note_2)   { create :calendar_note, day: day }

  it "should assign that share to a user upon creation" do
    puts day.calendar_notes

  end
end
