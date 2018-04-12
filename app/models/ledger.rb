class Ledger < ApplicationRecord
  belongs_to :user
  has_many :account_statements
end
