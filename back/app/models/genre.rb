class Genre < ApplicationRecord
  has_many :post_genres, dependent: :destroy
  has_many :posts, through: :post_genres, source: :post
  validates :name, presence: true, length: { maximum: 10 }
end
