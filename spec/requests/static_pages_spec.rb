require 'spec_helper'

describe "Static Pages" do

  subject { page }

  describe "Home page" do
    before { visit root_path }

    it { should have_title("Good Clean Games | Home") }
    it { should have_content("Good Clean Games") }

    it { should have_link("Sign in", href: new_user_session_path) }
    it { should have_link("Home", href: root_path) }

    it { should_not have_selector('section.games') }
    it { should_not have_selector('h2', text: 'Games') }
    it { should_not have_link('Rummy', href: games_rummy_path) }

    describe "when signed in" do
      let!(:user) { User.create(email: "me@example.com", password: "password") }
      before do
        visit new_user_session_path
        fill_in "Email", with: user.email
        fill_in "Password", with: user.password
        click_button "Sign in"
      end

      it { should have_content("Signed in successfully.") }
      it { should_not have_link("Sign in", href: new_user_session_path) }
      it { should have_link("Sign out", href: destroy_user_session_path) }

      it { should have_selector('section.games') }
      it { should have_selector('h2', text: 'Games') }
      it { should have_link('Rummy', href: games_rummy_path) }

      describe "selecting a game" do
        before { click_link('Rummy') }

        it { should have_title('Good Clean Games | Rummy') }
      end

      describe "signing out" do
        before { click_link "Sign out" }

        it { should have_content("Signed out successfully.") }
        it { should_not have_link("Sign out", href: destroy_user_session_path) }
        it { should have_link("Sign in", href: new_user_session_path) }
      end
    end
  end
end
