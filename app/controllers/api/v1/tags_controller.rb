class Api::V1::TagsController < ApplicationController
  def create
    tag = tag.new(tag_params)
    
    if tag.save
      render json: tag
    else
      render json: tag.errors
    end
  end

  def update
    tag = tag.find(params[:id])

    if tag.update(tag_params)
      render json: tag
    else
      render json: tag.errors
    end
  end

  private

  def tag_params
    params.permit(:name, :category)
  end
end