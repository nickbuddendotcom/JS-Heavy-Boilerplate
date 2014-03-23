# encoding: utf-8
class App < Sinatra::Application

  get "/" do
    @title = ""
    erb :index
  end

  # Model Example
  # get '/' do
  #   User.find.count # returns the total number of users.
  # end
end