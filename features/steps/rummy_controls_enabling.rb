class Spinach::Features::RummyControlsEnabling < Spinach::FeatureSteps
  include CommonSteps::Signin

  step 'I have cards that can be melded' do
    rig_hand_for_meld
  end

  step 'the discard button should be disabled' do
    within('#turn') do
      button = find('button', text: 'Discard')
      expect(button).to be_disabled
    end
  end

  step 'the meld button should be disabled' do
    within('#turn') do
      button = find('button', text: 'Meld')
      expect(button).to be_disabled
    end
  end

  step 'I draw and select a card' do
    find('#deck').click
    first('#player .hand li div').click
  end

  step 'the discard button should be enabled' do
    within('#turn') do
      button = find('button', text: 'Discard')
      expect(button).not_to be_disabled
    end
  end

  step 'I select cards that can be melded' do
    cardElements = page.all('#player .hand li div')
    cardElements[1..2].each { |cardElement| cardElement.click }
  end

  step 'the meld button should be enabled' do
    within('#turn') do
      button = find('button', text: 'Meld')
      expect(button).not_to be_disabled
    end
  end
end
