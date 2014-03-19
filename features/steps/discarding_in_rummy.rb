class Spinach::Features::DiscardingInRummy < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'they are at the start of a game' do
    # This step is used to clarify the feature file
    # Nothing needs to happen here
  end

  step 'they draw a card' do
    find('#deck').click
  end

  step 'they discard one of their cards' do
    first('#player .hand li div').click
    click_button('Discard')
  end

  step 'they should have seven cards' do
    within('#player .hand') do
      expect(page).to have_selector('li', count: 7)
    end
  end

  step 'the discard pile should have two cards' do
    within('#discard') do
      expect(page).to have_selector('li', count: 2)
    end
  end

  step 'the robot should take its turn' do
    within('#discard') do
      expect(page).to have_selector('li', count: 3)
    end
  end
end
