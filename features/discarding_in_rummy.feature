Feature: Discarding in Rummy

  @javascript
  Scenario: Discarding a card
    Given I am a signed-in user on the Rummy page
    And I am at the start of a game
    When I draw a card
    And I discard one of my cards
    Then I should have seven cards
    And the discard pile should have two cards
    And the robot should take its turn
