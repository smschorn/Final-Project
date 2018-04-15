class Api::AccountStatementsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_ledger
  before_action :set_account_statement, only: [:show, :update, :destroy]
  respond_to :json

  # GET /api/account_statements.json
  def index
    @account_statements = @ledger.account_statements
    .includes(:account)
    .order("accounts.name")
  respond_with @account_statements
  end

  # GET /api/account_statements/1.json
  def show
    respond_with @account_statement
  end

  # POST /api/account_statements.json
  def create
    @account_statement = @ledger.account_statements.create(account_statement_params)
    respond_with @account_statement, location: [:api, @ledger, @account_statement]
  end

  # PATCH/PUT /api/account_statements/1.json
  def update
    @account_statement.update(account_statement_params)
    respond_with@account_statement, json: @account_statement
  end

  # DELETE /api/account_statements/1.json
  def destroy
    @account_statement.destroy
    respond_with @account_statement
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account_statement
      @account_statement = @ledger.account_statements.find(params[:id])
    end

    def set_ledger
      @ledger = current_user.ledgers.find(params[:ledger_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def account_statement_params
      params.require(:account_statement).permit(:current_balance, :minimum_payment)
    end
end
