# encoding: utf-8

require 'mongo'

DB = Mongo::Connection.new.db("pxify", :pool_size => 5, :timeout => 5)

require_relative 'user'