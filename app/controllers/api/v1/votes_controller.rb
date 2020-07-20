class Api::V1::VotesController < ApplicationController
  before_action :find_project

  def create
    vote = @project.votes.build(user_id: current_user.id)

    if vote.save
      render json: vote
    else
      render json: vote.errors
    end
  end

  def destroy
    vote = Vote.find_by(user_id: current_user.id, project_id: @project.id)

    if vote.destroy
      render json: { alert: "Vote removed." }
    else
      render json: { alert: "Vote doesn't exist." }
    end
  end

  private

  def find_project
    @project = Project.find(params[:project_id])
  end
end