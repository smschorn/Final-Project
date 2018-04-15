class AccountStatement < ApplicationRecord
  belongs_to :ledger
  belongs_to :account

  def as_json(options)
    super({include: :account}.merge(options))
  end 
end
