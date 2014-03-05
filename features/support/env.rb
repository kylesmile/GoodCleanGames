ENV['RAILS_ENV'] = 'test'
require './config/environment'
require 'spinach/capybara'
require 'rspec/expectations'

require 'database_cleaner'
DatabaseCleaner.strategy = :truncation

Spinach.hooks.after_scenario do
  DatabaseCleaner.clean
end

# Spinach.hooks.before_scenario{ DatabaseCleaner.clean }
#
# Spinach.config.save_and_open_page_on_failure = true
