VCR.configure do |config|
  config.cassette_library_dir = 'spec/vcr'
  config.hook_into :webmock
  config.configure_rspec_metadata!
  config.allow_http_connections_when_no_cassette = true
  config.filter_sensitive_data('<ACCESS_TOKEN>') { Config.env[:mapbox][:access_token] }
  config.filter_sensitive_data('<AUTHORIZATION>') do |interaction|
    if interaction.request.headers['Authorization'].nil?
      ''
    else
      interaction.request.headers['Authorization'].first
    end
  end
end
