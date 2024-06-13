class Letter < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates :sentences, presence: true, length: { maximum: 100_000 }
  validates :name, presence: true, length: { maximum: 10 }

  before_validation :set_default_uuid, on: :create

  def set_default_uuid
    new_uuid = SecureRandom.uuid
    encode_uuid = Base64.urlsafe_encode64([new_uuid.delete('-')].pack("H*")).tr('=', '')
    self.uuid = encode_uuid
  end
end
