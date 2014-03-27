Feature: Rummy Controls Enabling

  @javascript
  Scenario: Enabling and disabling Discard and Meld buttons
    Given I am a signed-in user on the Rummy page
    And I have cards that can be melded
    Then the discard button should be disabled
    And the meld button should be disabled
    When I draw and select a card
    Then the discard button should be enabled
    When I select cards that can be melded
    Then the meld button should be enabled
    And the discard button should be disabled

  @javascript
  Scenario: Enabling and disabling the Add to set button
    Given I am a signed-in user on the Rummy page
    And I have melded a set
    And I have a card I can add to the set
    Then the Add to set button should be disabled
    When I draw
    And select the card
    Then the Add to set button should be enabled
