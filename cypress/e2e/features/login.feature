Feature: Saucedemo Login Functionality

    Background: 
        Given I navigate to Saucedemo website

    Scenario: Verify login page is loaded correctly
        Then I should see the Swag Labs logo
        And I should see username input field
        And I should see password input field
        And I should see login button

    Scenario: Succesfully login with valid credentials
        When I enter username "standard_user"
        And I enter password "secret_sauce"
        And I click on login button
        Then I should be redirected to inventory page
        Then I should see "Products" title

    Scenario: Login with invalid credentials
        When I enter username "wrong_user"
        And I enter password "wrong-password"
        And I click on login button
        Then I should see error message "Username and password do not match any user in this service"

    Scenario: Login with multiple users
        When I enter username "<username>"
        And I enter password "<password>"
        And I click on login button
        Then I should see error message "<result>"

        Examples:
        |   username        |password     |result                                 |
        |   locked_out_user |secret_sauce |Epic sadface: Sorry, this user has been locked out.  |
        |   wrong_user      |wrong_pass   |Epic sadface: Username and password do not match any user in this service|