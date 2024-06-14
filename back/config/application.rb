require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.api_only = true

    config.generators do |g|
      g.skip_routes true   # ルート自動設定を無効化
      g.helper false       # ヘルパー生成を無効化
      g.test_framework nil # テストフレームワークを無効化
    end

    # タイムゾーンを日本時間に設定
    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local
    # i18nの設定
    config.i18n.default_locale = :ja
    # Cookieを使うための設定
    config.middleware.use ActionDispatch::Cookies
    # セッションを使うための設定
    config.middleware.use ActionDispatch::Session::CookieStore, key: '_kotonoha_tsuduri_token'
    # Cookieで同じサイトを扱うための設定
    config.action_dispatch.cookies_same_site_protection = :none
    config.action_controller.forgery_protection_origin_check = false

    # COOPとCOEPのエラー対策
    # TODO : 要確認
    config.action_dispatch.default_headers.merge!(
      'Cross-Origin-Opener-Policy' => 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy' => 'unsafe-none'
    )
  end
end
