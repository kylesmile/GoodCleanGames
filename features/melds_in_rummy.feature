Feature: Melds in Rummy

  @javascript
  Scenario: Making a new meld
    Given I am a signed-in user on the Rummy page
    And I have cards that can be melded
    When I make a meld
    Then the page should show the meld

  @javascript
  Scenario: Adding to sets
    Given I am a signed-in user on the Rummy page
    And I have melded a set
    And I have a card I can add to the set
    When I add the card to my meld
    Then the page should show the updated meld
