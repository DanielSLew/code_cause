class MessagesController < ApplicationController
  before_action :set_message, only: [:update, :destroy]

  def index
    messages = Message.where(project_id: params[:project_id])
    render json: messages
  end

  def create
    message = current_user.messages.build(params.permit(:body), 
                                          project_id: params[:project_id])
    
    if message.save
      render json: message
    else
      render json: message.errors
    end
  end

  def update
    if @message.update(params.permit(:body))
      render json: @message
    else
      render json: @message.errors
    end
  end

  def destroy
    @message.destroy
    render json: { message: 'Message Deleted!' }
  end

  private

  def set_message
    @message = Message.find(params[:id])    
  end
end