class Spinach::Features::RummyPage < Spinach::FeatureSteps
  step 'a signed-in user on the Rummy page' do
    @user = User.create(email: 'me@example.com', password: 'password')
    signin(@user)
    click_link('Rummy')
  end

  step 'their opponent should have seven cards' do
    within('#opponent-hand') do
      expect(page).to have_selector('li img', count: 7)
    end
  end

  step 'they should have seven cards' do
    within('#hand') do
      expect(page).to have_selector('li img', count: 7)
    end
  end

  step 'there should be one card in the discard pile' do
    within('.discard') do
      expect(page).to have_selector('li img', count: 1)
    end
  end

  step 'the deck should be displayed properly' do
    expect(page).to have_selector('img.deck[src="/assets/cards/backs_blue.png"]')
  end
end
