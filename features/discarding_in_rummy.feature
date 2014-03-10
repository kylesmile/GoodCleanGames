Feature: Discarding in Rummy

  @javascript
  Scenario: Discarding a card
    Given a signed-in user on the Rummy page at the start of a game
    And they draw a card
    When they discard one of their cards
    Then they should have seven cards
    And the discard pile should have two cards
    And the robot should take its turn
