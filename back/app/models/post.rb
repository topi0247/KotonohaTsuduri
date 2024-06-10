class Post < ApplicationRecord
  has_many :post_letters, dependent: :destroy
  has_many :letters, through: :post_letters, source: :letter
  has_many :post_genres, dependent: :destroy
  has_many :genres, through: :post_genres, source: :genre
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags, source: :tag
end
