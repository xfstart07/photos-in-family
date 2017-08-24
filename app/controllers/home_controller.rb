class HomeController < ApplicationController
  def index
    @photos = Photo.page(params[:page]).per(9)
  end
end
