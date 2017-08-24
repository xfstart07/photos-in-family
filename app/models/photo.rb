class Photo < ApplicationRecord
  belongs_to :tag

  validates :title, :url, presence: true

  mount_uploader :url, PhotosUploader

  def as_basic_json
    HashWithIndifferentAccess.new({
      id: id,
      title: title,
      url: url.url,
      tag_id: tag_id,
      tag_name: tag&.name,
      created_at: created_at.to_s(:cn_date)
    })
  end
end
