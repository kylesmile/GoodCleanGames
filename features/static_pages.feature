Feature: Static Pages

  Scenario: Home page when not signed in
    Given someone visiting the home page
    Then the home page should have the proper title and content

  Scenario: Signing in
    Given a signed-up user
    And someone visiting the home page
    When they sign in
    Then the home page should change appropriately

  Scenario: Signing out
    Given a signed-up user
    And a signed-in user
    When they click the sign out link
    Then the home page should have the proper title and content

  Scenario: Selecting a game
    Given a signed-up user
    And a signed-in user
    When they click a link for a game
    Then they should be taken to that game's page
