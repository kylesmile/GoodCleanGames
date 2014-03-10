class Spinach::Features::DiscardingInRummy < Spinach::FeatureSteps
  step 'a signed-in user on the Rummy page at the start of a game' do
    @user = User.create(email: 'me@example.com', password: 'password')
    signin(@user)
    click_link('Rummy')
  end

  step 'they draw a card' do
    find('.deck').click
  end

  step 'they discard one of their cards' do
    first('#hand li img').click
    click_button('Discard')
  end

  step 'they should have seven cards' do
    within('#hand') do
      expect(page).to have_selector('li img', count: 7)
    end
  end

  step 'the discard pile should have two cards' do
    within('.discard') do
      expect(page).to have_selector('li img', count: 2)
    end
  end

  step 'the robot should take its turn' do
    within('.discard') do
      expect(page).to have_selector('li img', count: 3)
    end
  end
end
