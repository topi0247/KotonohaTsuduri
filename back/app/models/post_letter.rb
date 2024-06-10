class PostLetter < ApplicationRecord
  belongs_to :post
  belongs_to :letter
end
