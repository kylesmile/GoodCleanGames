Feature: Drawing in Rummy

  @javascript
  Scenario: Drawing a card
    Given a signed-in user on the Rummy page
    When they click on the deck
    Then they should have another card
    When they click on the deck
    Then they should not have another card
