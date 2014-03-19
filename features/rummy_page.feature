Feature: Rummy Page

  @javascript
  Scenario: Initial Rummy Page
    Given I am a signed-in user on the Rummy page
    And I am at the start of a game
    Then my opponent should have seven cards
    And I should have seven cards
    And there should be one card in the discard pile
    And the deck should be displayed properly
