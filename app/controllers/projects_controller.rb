class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update]

  def index
    projects = Project.all
    render json: projects
  end

  def show
    render json: @project
  end

  def create
    project = Project.new(project_params)
    
    if project.save
      render json: project
    else
      render json: project.errors
    end
  end

  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors
    end
  end

  def destroy
    @project.destroy
    render json: { message: 'Project Deleted!' }
  end

  private

  def set_project
    @project = Project.find(params[:id])    
  end

  def project_params
    params.permit(:name, :body, :description)
  end
end