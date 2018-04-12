class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.string :name
      t.text :description
      t.float :interest_rate
      t.integer :user_id

      t.timestamps
    end
  end
end
