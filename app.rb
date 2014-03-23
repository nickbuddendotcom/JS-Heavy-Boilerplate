require 'bundler'
Bundler.require

set :port, 3000

class App < Sinatra::Application
  enable :sessions

  configure :production do
    set :clean_trace, true
    set :css_files, :blob
    set :js_files,  :blob
  end

  configure :development do
  end

  helpers do
    include Rack::Utils
    alias_method :h, :escape_html
  end
end

require_relative 'helpers/init'
require_relative 'models/init'
require_relative 'routes/init'