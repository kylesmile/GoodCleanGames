Feature: Static Pages

  Scenario: Home page when not signed in
    Given someone visiting the home page
    Then the home page should be for non-signed-in users

  Scenario: Signing up
    Given someone visiting the home page
    When they click the sign up link
    And fill in the sign-up form
    Then they should be signed in as a new user
    And the home page should be for signed-in users

  Scenario: Signing in
    Given a signed-up user
    And someone visiting the home page
    When they sign in
    Then the home page should be for signed-in users

  @javascript
  Scenario: Signing out
    Given a signed-in user
    When they click the sign out link
    Then the home page should be for non-signed-in users

  Scenario: Selecting a game
    Given a signed-in user
    When they click a link for a game
    Then they should be taken to that game's page
