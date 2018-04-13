class Api::AccountsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_account, only: [:show, :update, :destroy]
  respond_to :json

  # GET /api/accounts.json
  def index
    @accounts = current_user.accounts.all
    respond_with @accounts
  end

  # GET /api/accounts/1.json
  def show
    respond_with @account, location: api_account_url(@account)
  end

  # POST /api/accounts.json
  def create
    @account = current_user.accounts.create(account_params)
    respond_with @account, location: api_account_url(@account)
  end

  # PATCH/PUT /api/accounts/1.json
  def update
    @account.update(account_params)
    respond_with @account, json: @account
  end

  # DELETE /api/accounts/1.json
  def destroy
    @account.destroy
    respond_with @account
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account
      @account = current_user.accounts.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def account_params
      params.require(:account).permit(:name, :description, :interest_rate, :user_id)
    end
end
