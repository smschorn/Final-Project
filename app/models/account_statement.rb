class AccountStatement < ApplicationRecord
  belongs_to :ledger
  belongs_to :account
end
