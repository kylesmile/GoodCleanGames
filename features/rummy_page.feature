Feature: Rummy Page

  @javascript
  Scenario: Initial Rummy Page
    Given a signed-in user on the Rummy page at the start of a game
    Then their opponent should have seven cards
    And they should have seven cards
    And there should be one card in the discard pile
    And the deck should be displayed properly
