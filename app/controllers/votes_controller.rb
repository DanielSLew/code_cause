class VotesController < ApplicationController
  def create
    vote = @project.votes.build(user_id: params[:user_id])

    if vote.save
      render json: vote
    else
      render json: vote.errors
    end
  end

  def destroy
    vote = Vote.find_by(user_id: params[:user_id], project_id: @project.id)

    if vote.destroy
      render json: { alert: "Vote removed." }
    else
      render json: { alert: "Vote doesn't exist." }
    end
  end
end