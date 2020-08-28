require 'byebug'
class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy, :add_contributor]

  def index
    projects = Project.all_with_tags_votes
    render json: projects
  end

  def show
    if !@project
      render json: {}, status: :not_found
    else
      render json: project_details
    end
  end

  def create
    new_project_params = project_params
    new_project_params['body'] = new_project_params['body'].to_json

    project = Project.new(new_project_params)

    if project.save
      user = User.find(params[:creator])
      project.add_creator(user)

      render json: project, status: :created
    else
      render json: project.errors, status: :bad_request
    end
  end

  def update
    if !@project
      render json: {}, status: :not_found
    elsif @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :bad_request
    end
  end

  def destroy
    if !@project
      render json: {}, status: :not_found
    else
      @project.destroy
      render json: { message: 'Project Deleted!' }
    end
  end

  def create_contributor
    user = User.find(params[:user_id])

    if user && @project.add_contributor(user)
      render json: { message: "Contributor added" }
    else
      render json: { error: "Invalid user or project" }, status: :bad_request
    end  
  end

  def destroy_contributor
    permission = ProjectPermission.find_by(
      project_id: params[:id], 
      user_id: params[:user_id],
      role: "Contributor")

    if permission && permission.destroy
      render json: { message: "Contributor removed" }
    else
      render json: { error: "Contributor permission does not exist" }, status: :bad_request
    end
  end

  private

  def set_project
    begin
      @project = Project.find(params[:id])
    rescue
      @project = nil
    end
  end

  def project_params
    params.require(:project).permit(:name, :description, body: [:question, :answer])
  end

  def project_details
    { 
      **@project.as_json, 
      contributors: @project.contributors,
      creators: @project.creators,
      votes: @project.votes,
      tags: @project.tags,
    }
  end
end