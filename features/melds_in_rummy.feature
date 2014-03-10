Feature: Melds in Rummy

  @javascript
  Scenario: Making a new meld
    Given a signed-in user on the Rummy page
    And with cards that can be melded
    When they make a meld
    Then the page should show the meld
