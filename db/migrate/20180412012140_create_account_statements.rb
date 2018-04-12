class CreateAccountStatements < ActiveRecord::Migration[5.1]
  def change
    create_table :account_statements do |t|
      t.integer :ledger_id
      t.integer :account_id
      t.float :current_balance
      t.integer :minimum_payment

      t.timestamps
    end
  end
end
