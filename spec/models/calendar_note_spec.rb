require 'spec_helper'

describe CalendarNote do
  it { should belong_to :day }
  it { should validate_presence_of :note }
  it { should validate_presence_of :x_pos }
  it { should validate_presence_of :y_pos }
end
