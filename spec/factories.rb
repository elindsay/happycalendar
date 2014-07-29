FactoryGirl.define do
  sequence :email do |n|
    "person#{n}@example.com"
  end

  factory :user do
    email
    name "Jenny McLenny"
    password "password"
    password_confirmation "password"
  end

  factory :calendar do
    user
    name "My Calendar"
  end

  factory :day do
    user
    calendar
    month 0
    day 10
    year 2014
    #add a with notes here!!!
  end

  factory :calendar_note do
    day
    note "8:00p Have SUPER FUN!!"
    x_pos 450
    y_pos 250
    html_identifier Time.now.to_i
  end
end
