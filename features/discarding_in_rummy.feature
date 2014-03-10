Feature: Discarding in Rummy

  @javascript
  Scenario: Discarding a card
    Given a signed-in user on the Rummy page
    And they are at the start of a game
    When they draw a card
    And they discard one of their cards
    Then they should have seven cards
    And the discard pile should have two cards
    And the robot should take its turn
