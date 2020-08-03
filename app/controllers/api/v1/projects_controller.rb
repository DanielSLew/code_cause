require 'byebug'
class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy]

  def index
    projects = Project.all_with_tags_votes
    render json: projects
  end

  def show
    if !@project
      render json: {}, status: :not_found
    else
      render json: { 
        **@project.as_json, 
        contributors: @project.contributors,
        creators: @project.creators,
        votes: @project.votes,
        tags: @project.tags
      }
    end
  end

  def create
    project = Project.new(project_params)
    
    if project.save
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

  private

  def set_project
    begin
      @project = Project.find(params[:id])
    rescue
      @project = nil
    end
  end

  def project_params
    params.permit(:name, :body, :description)
  end
end