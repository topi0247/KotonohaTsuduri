class Post < ApplicationRecord
  has_many :letters, dependent: :destroy
  has_many :post_genres, dependent: :destroy
  has_many :genres, through: :post_genres, source: :genre
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags, source: :tag

  before_validation :set_default_uuid, on: :create

  scope :per_page, ->(pege) {
    page = page.to_i
    page = 1 if page < 1 || nil
    limit(12).offset((page - 1) * 12)
  }

  def set_default_uuid
    new_uuid = SecureRandom.uuid
    encode_uuid = Base64.urlsafe_encode64([new_uuid.delete('-')].pack("H*")).tr('=', '')
    self.uuid = encode_uuid
  end

  def self.find_by_uuid_or_create(search_uuid)
    return Post.create if search_uuid == 'none'
    return nil if search_uuid.length < 22

    find_by(uuid: search_uuid)
  end

  def create_tags!(tag_names)
    post_tags.destroy_all
    tag_names.each do |tag_name|
      tag = Tag.find_or_create_by(name: tag_name)
      post_tags.build(tag: tag)
    end
  end

  def create_genres!(genre_names)
    post_genres.destroy_all
    genre_names.each do |genre_name|
      genre = Genre.find_or_create_by(name: genre_name)
      post_genres.build(genre: genre)
    end
  end

  def as_custom_index_json
    {
      uuid: uuid,
      letters: letters.first ? {
        name: letters.first.name,
        sentences: letters.first.sentences.slice(0, 140),
      } : {},
    }
  end
end
