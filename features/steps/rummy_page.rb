class Spinach::Features::RummyPage < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'they are at the start of a game' do
    # This step is used to clarify the feature file
    # Nothing needs to happen here
  end

  step 'their opponent should have seven cards' do
    within('#opponent .hand') do
      expect(page).to have_selector('li', count: 7)
    end
  end

  step 'they should have seven cards' do
    within('#player .hand') do
      expect(page).to have_selector('li', count: 7)
    end
  end

  step 'there should be one card in the discard pile' do
    within('#discard') do
      expect(page).to have_selector('li', count: 1)
    end
  end

  step 'the deck should be displayed properly' do
    expect(page).to have_selector('#deck img[src="/assets/cards/backs_blue.png"]')
  end
end
