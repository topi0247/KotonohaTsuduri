class PostGenre < ApplicationRecord
  belongs_to :post
  belongs_to :genre
end
