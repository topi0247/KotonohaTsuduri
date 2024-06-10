class Api::V1::BasesController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
end
