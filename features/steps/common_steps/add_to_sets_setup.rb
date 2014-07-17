module CommonSteps
  module AddToSetsSetup
    include Spinach::DSL

    step "I have melded a set" do
      find('#deck').click
      rig_hand_for_meld
      page.all('#player .hand div')[0..2].each { |card| card.click }
      click_button 'Meld'
    end

    step "I have a card I can add to the set" do
      page.execute_script('Rummy.game.player(1).takeCard(new RummyCard("A", "H"))')
    end
  end
end
