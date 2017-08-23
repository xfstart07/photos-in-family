class PhotosController < ApplicationController
  def create
    @photo = Photo.new(title: params[:file].original_filename, url: params[:file])

    if @photo.save
      render json: { status: 'ok' }
    else
      render json: { status: 'error' }
    end
  end
end
