Feature: Drawing in Rummy

  @javascript
  Scenario: Drawing a card
    Given I am a signed-in user on the Rummy page
    When I click on the deck
    Then I should have another card
    When I click on the deck
    Then I should not have another card
