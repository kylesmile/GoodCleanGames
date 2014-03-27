class Spinach::Features::MeldsInRummy < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'I have cards that can be melded' do
    rig_hand_for_meld
    find('#deck').click
  end

  step 'I make a meld' do
    cardElements = page.all('#player .hand div')
    cardElements[0..2].each { |cardElement| cardElement.click }
    click_button 'Meld'
  end

  step 'the page should show the meld' do
    within '#player .melds' do
      expect(page).to have_selector('li ul', count: 1)
      within 'li ul' do
        expect(page).to have_selector('li div', count: 3)
      end
    end
  end

  step "I have melded a set" do
    find('#deck').click
    rig_hand_for_meld
    page.all('#player .hand div')[0..2].each { |card| card.click }
    click_button 'Meld'
  end

  step "I have a card I can add to the set" do
    page.execute_script('Rummy.game.player(1).takeCard(new RummyCard("A", "H"))')
  end

  step "I add the card to my meld" do
    first('#player .hand div').click
    click_button('Add to set')
  end

  step "the page should show the updated meld" do
    within('#player .melds') do
      expect(page).to have_selector('li ul', count: 1)
      within 'li ul' do
        expect(page).to have_selector('li div', count: 4)
      end
    end
  end
end
