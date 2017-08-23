class Photo < ApplicationRecord
  validates :title, :url, presence: true

  mount_uploader :url, PhotosUploader
end
