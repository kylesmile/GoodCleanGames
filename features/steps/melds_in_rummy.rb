class Spinach::Features::MeldsInRummy < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'with cards that can be melded' do
    click_button "Meld Rig"
  end

  step 'they make a meld' do
    cardElements = page.all('#hand li img')
    cardElements[0..2].each { |cardElement| cardElement.click }
    click_button 'Meld'
  end

  step 'the page should show the meld' do
    within '#player-melds .melds' do
      expect(page).to have_selector('li ul', count: 1)
      within 'li ul' do
        expect(page).to have_selector('li img', count: 3)
      end
    end
  end
end
