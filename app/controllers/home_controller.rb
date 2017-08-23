class HomeController < ApplicationController
  def index
    @photos = Photo.limit(9)
  end
end
