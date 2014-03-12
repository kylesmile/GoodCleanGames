class Spinach::Features::StaticPages < Spinach::FeatureSteps
  step 'someone visiting the home page' do
    visit root_path
  end

  step 'the home page should be for non-signed-in users' do
    expect(page).to have_title("Good Clean Games | Home")
    expect(page).to have_content("Good Clean Games")
    expect(page).to have_link("Sign in", href: new_user_session_path)
    expect(page).to have_link("Home", href: root_path)

    expect(page).not_to have_selector('section.games')
    expect(page).not_to have_selector('h2', text: 'Games')
    expect(page).not_to have_link('Rummy', href: games_rummy_path)
  end

  step 'a signed-up user' do
    @user = User.create(email: 'me@example.com', password: 'password')
  end

  step 'they sign in' do
    click_link 'Sign in'
    fill_in_sign_in_form(@user)
    expect(current_path).to eq(root_path)
    expect(page).to have_content('Signed in successfully.')
  end

  step 'the home page should be for signed-in users' do
    expect(page).not_to have_link('Sign in', href: new_user_session_path)
    expect(page).to have_link('Sign out', href: destroy_user_session_path)

    expect(page).to have_selector('section.games')
    expect(page).to have_selector('h2', text: 'Games')
    expect(page).to have_link('Rummy', href: games_rummy_path)
  end

  step 'a signed-in user' do
    @user = User.create(email: 'me@example.com', password: 'password')
    signin(@user)
  end

  step 'they click the sign out link' do
    click_link 'Sign out'
    expect(page).to have_content("Signed out successfully.")
  end

  step 'they click a link for a game' do
    click_link 'Rummy'
  end

  step 'they should be taken to that game\'s page' do
    expect(page).to have_title('Good Clean Games | Rummy')
  end
end
