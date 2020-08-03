class Api::V1::TagsController < ApplicationController
  def create
    tag = Tag.new(tag_params)
    
    if tag.save
      render json: tag, status: :created
    else
      render json: tag.errors, status: :bad_request
    end
  end

  # Is updating neccessary?
  
  # def update
  #   tag = Tag.find(params[:id])

  #   if tag.update(tag_params)
  #     render json: tag
  #   else
  #     render json: tag.errors
  #   end
  # end

  private

  def tag_params
    params.permit(:name, :category)
  end
end