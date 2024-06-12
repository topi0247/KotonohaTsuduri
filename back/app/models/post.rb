class Post < ApplicationRecord
  has_many :post_letters, dependent: :destroy
  has_many :letters, through: :post_letters, source: :letter
  has_many :post_genres, dependent: :destroy
  has_many :genres, through: :post_genres, source: :genre
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags, source: :tag

  def get_short_uuid
    Base64.urlsafe_encode64([uuid.delete('-')].pack("H*")).tr('=', '')
  end

  def self.find_or_create_by_short_uuid(uuid)
    if uuid < 22 && uuid != 'none'
      return nil
    end

    if uuid == 'none'
      post = Post.create!
      post
    else
      decode_uuid = Base64.urlsafe_decode64(shot_uuid + '=' * (4 - shot_uuid.length % 4)).unpack("H*")[0]
      find_by(uuid: decode_uuid.scan(/.{8}|.+/).join('-'))
    end
  end
end
