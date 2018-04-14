class Api::LedgersController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_ledger, only: [:show, :update, :destroy]
  respond_to :json

  # GET /api/ledgers.json
  def index
    @ledgers = current_user.ledgers.all
    respond_with @ledgers
  end

  # GET /api/ledgers/1.json
  def show
    respond_with @ledger, location: api_ledger_url(@ledger)
  end

  # POST /api/ledgers.json
  def create
    @ledger = current_user.ledgers.create(ledger_params)
    respond_with @ledger, location: api_ledger_url(@ledger)
  end

  # PATCH/PUT /api/ledgers/1.json
  def update
    @ledger.update(ledger_params)
    respond_with @ledger, json: @ledger
  end

  # DELETE /api/ledgers/1.json
  def destroy
    @ledger.destroy
    respond_with @ledger
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ledger
      @ledger = current_user.ledgers.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ledger_params
      params.require(:ledger).permit(:year, :month, :budget, :user_id)
    end
end
