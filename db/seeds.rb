user = User.create(email: 'test@email.com', password: 'password', password_confirmation: 'password')

accounts = [
  Account.create(user: user, name: 'AmEx', interest_rate: 1.50),
  Account.create(user: user, name: 'BofA MC', interest_rate: 1.50),
  Account.create(user: user, name: 'BofA VISA', interest_rate: 1.50),
]

ledger = Ledger.create(user: user, month: 3, year: 2018, budget: 790.93)

AccountStatement.create(ledger: ledger, account: accounts[0], )

AccountStatement.create(ledger: ledger, account: accounts[0], current_balance: 5452.84,  minimum_payment: 209.00)
AccountStatement.create(ledger: ledger, account: accounts[1], current_balance: 0,        minimum_payment: 25.00)
AccountStatement.create(ledger: ledger, account: accounts[2], current_balance: 2308.94,  minimum_payment: 88.00)
