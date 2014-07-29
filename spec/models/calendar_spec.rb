require 'spec_helper'

describe Calendar do
  it { should belong_to :user }
  it { should have_many :days }
  it { should validate_presence_of :name }
  it { should validate_presence_of :user }
end
