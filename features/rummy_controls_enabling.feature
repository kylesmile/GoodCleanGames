Feature: Rummy Controls Enabling

  @javascript
  Scenario: Controls enabling when selected cards can be played
    Given I am a signed-in user on the Rummy page
    And I have cards that can be melded
    Then the discard button should be disabled
    And the meld button should be disabled
    When I draw and select a card
    Then the discard button should be enabled
    When I select cards that can be melded
    Then the meld button should be enabled
    And the discard button should be disabled
