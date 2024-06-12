Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV["FRONT_URL"]

    resource "*",
      headers: :any,
      expose: ['access-token', 'expiry', 'uid', 'client'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
