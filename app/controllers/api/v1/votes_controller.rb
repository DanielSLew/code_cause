class Api::V1::VotesController < ApplicationController
  before_action :find_project

  def create
    if !@project
      render json: {}, status: :not_found
    else
      vote = @project.votes.build(user_id: params[:user_id])

      if vote.save
        render json: vote, status: :created
      else
        render json: vote.errors, status: :bad_request
      end
    end
  end

  def destroy
    if !@project
      render json: {}, status: :not_found
    else
      vote = Vote.find_by(user_id: params[:user_id], project_id: @project.id)

      if vote
        vote.destroy
        render json: { success: "Vote removed." }
      else
        render json: { alert: "Vote doesn't exist." }, status: :not_found
      end
    end
  end

  private

  def find_project
    begin
      @project = Project.find(params[:project_id])
    rescue
      @project = nil
    end
  end
end