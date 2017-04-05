class User < ActiveRecord::Base
  before_save { email.downcase! }
  has_secure_password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, uniqueness: { case_sensitive: false },
                    presence: true, length: {maximum: 30},
                    format: { with: VALID_EMAIL_REGEX }
  validates :name, presence: true, length: {maximum: 15}
  validates :password, length: { minimum: 6}

end
