class Spinach::Features::DrawingInRummy < Spinach::FeatureSteps
  step 'a signed-in user on the Rummy page' do
    @user = User.create(email: 'me@example.com', password: 'password')
    signin(@user)
    click_link('Rummy')
  end

  step 'they click on the deck' do
    find('.deck').click
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
