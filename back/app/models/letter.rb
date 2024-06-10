class Letter < ApplicationRecord
  has_many :post_letters, dependent: :destroy
  has_many :posts, through: :post_letters, source: :post
  belongs_to :user
  validates :sentences, presence: true, length: { maximum: 100_000 }
  validates :name, presence: true, length: { maximum: 10 }, defaults: { name: '名もなき人' }
end
