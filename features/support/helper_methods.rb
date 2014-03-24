class Spinach::FeatureSteps
  def signin(user)
    visit new_user_session_path
    fill_in_sign_in_form(user)
  end

  def fill_in_sign_in_form(user)
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Sign in'
  end

  def rig_hand_for_meld
    page.execute_script('var player = Rummy.game.player(1);
                         player.takeCards([new RummyCard("A", "S"), new RummyCard("A", "C"), new RummyCard("A", "D")])')
  end
end