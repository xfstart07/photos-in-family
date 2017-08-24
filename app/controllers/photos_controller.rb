class PhotosController < ApplicationController
  def create
    @photo = Photo.create(title: params[:file].original_filename, url: params[:file])

    if @photo.errors.any?
      render json: { status: 'error' }
    else
      render json: { status: 'ok' }
    end
  end

  def update
    logger.debug params
    @photo = Photo.find(params[:id])

    if params[:tag_name].blank?
      render json: { status: 'error', message: '标题没有上传' }
      return
    end

    tag = Tag.find_or_create_by(name: params[:tag_name])

    if @photo.update(tag: tag)
      render json: { photo: @photo.as_basic_json, status: 'ok' }
    else
      render json: { status: 'error', message: '标签设置失败' }
    end
  end
end
