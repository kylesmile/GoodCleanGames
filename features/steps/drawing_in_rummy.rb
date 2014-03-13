class Spinach::Features::DrawingInRummy < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'they click on the deck' do
    find('#deck').click
  end

  step 'they should have another card' do
    within('#hand') do
      expect(page).to have_selector('li img', count: 8)
    end
  end

  step 'they should not have another card' do
    within('#hand') do
      expect(page).to have_selector('li img', count: 8)
    end
  end
end
