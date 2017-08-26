json.photos @photos do |photo|
  json.extract! photo, :id, :title, :tag_id
  json.url photo.file_url
  json.tag_name photo.tag_name
  json.created_at photo.created_at.to_s(:cn_date)
end

json.pagination do
  json.current_page @photos.current_page
  json.total_count @photos.total_count
end
