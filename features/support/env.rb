ENV['RAILS_ENV'] = 'test'
require './config/environment'
require 'spinach/capybara'
require 'rspec/expectations'
require 'capybara/poltergeist'

require 'database_cleaner'
DatabaseCleaner.strategy = :truncation

Capybara.javascript_driver = :poltergeist

Spinach.hooks.after_scenario do
  DatabaseCleaner.clean
end

# Spinach.hooks.before_scenario{ DatabaseCleaner.clean }
#
# Spinach.config.save_and_open_page_on_failure = true
