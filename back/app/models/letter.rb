class Letter < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates :sentences, presence: true, length: { maximum: 100_000 }
  validates :name, presence: true, length: { maximum: 10 }

  before_validation :set_default_uuid, on: :create
  before_validation :set_default_name, on: :create

  scope :per_page, ->(page) {
    page = page.to_i
    page = 1 if page < 1
    limit(1).offset((page - 1))
  }

  def set_default_uuid
    new_uuid = SecureRandom.uuid
    encode_uuid = Base64.urlsafe_encode64([new_uuid.delete('-')].pack("H*")).tr('=', '')
    self.uuid = encode_uuid
  end

  def set_default_name
    self.name = "名もなき人"
  end

  def as_custom_json
    {
      name: name,
      sentences: sentences,
      created_at: created_at.strftime('%Y/%m/%d %H:%M'),
    }
  end
end
