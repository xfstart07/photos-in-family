class AddTagIdToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :photos, :tag_id, :integer, after: :url
  end
end
