class Spinach::Features::DrawingInRummy < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'I click on the deck' do
    find('#deck').click
  end

  step 'I should have another card' do
    within('#player .hand') do
      expect(page).to have_selector('li', count: 8)
    end
  end

  step 'I should not have another card' do
    within('#player .hand') do
      expect(page).to have_selector('li', count: 8)
    end
  end
end
