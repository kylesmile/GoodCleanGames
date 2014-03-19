module CommonSteps
  module Signin
    include Spinach::DSL

    step 'I am a signed-in user on the Rummy page' do
      @user = User.create(email: 'me@example.com', password: 'password')
      signin(@user)
      visit games_rummy_path
    end
  end
end