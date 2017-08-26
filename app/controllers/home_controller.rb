class HomeController < ApplicationController
  def index
    @photos = Photo.query_by(params).order(created_at: :desc).page(params[:page]).per(9)
  end
end
