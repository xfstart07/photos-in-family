class Photo < ApplicationRecord
  belongs_to :tag, optional: true

  validates :title, :url, presence: true

  mount_uploader :url, PhotosUploader

  def self.query_by(params)
    query = all

    if params[:tag_id]
      query = query.where(tag_id: params[:tag_id])
    end

    query
  end

  def tag_name
    tag&.name
  end

  def file_url
    url.url
  end

  def as_basic_json
    HashWithIndifferentAccess.new({
      id: id,
      title: title,
      url: file_url,
      tag_id: tag_id,
      tag_name: tag_name,
      created_at: created_at.to_s(:cn_date)
    })
  end
end
