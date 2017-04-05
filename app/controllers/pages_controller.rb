class PagesController < ApplicationController
  require "addressable/uri"
  before_action :logged_in_user, only: [:index, :show]
  def welcome
  end

  def index

    
    if params[:location] && params[:location] != ''
      @geocode = Geocoder.coordinates(params[:location])
      @lat = @geocode[0]
      @lon = @geocode[1]
    end


    if params[:activity]
      if @lat && @lon
        @response = HTTParty.get(endpoint + "&q[activities_activity_type_name_cont]=#{params[:activity]}&lat=#{@lat}&lon=#{@lon}")
      else
        @response = HTTParty.get(endpoint + "&q[activities_activity_type_name_cont]=#{params[:activity]}")
      end
      @coordinates = []
      @response["places"].each do |place|
        @coordinates << [place["lat"],place["lon"]]
      end
    elsif params[:activity] == ''
      if @lat && @lon
        @response = HTTParty.get(endpoint + "&lat=#{@lat}&lon=#{@lon}")
      else
        @response = HTTParty.get(endpoint)
      end
      @coordinates = []
      @response["places"].each do |place|
        @coordinates << [place["lat"],place["lon"]]
      end
    end

  end
  # container method
  def show
          if params[:trail]
        trail = params[:trail]
        name = trail.delete(' /')
        # weather not working yet
        # also need new trail get request
      encoded_url = URI.encode(endpoint + "&q[name_eq]=#{trail}")
      trailuri = HTTParty.get(encoded_url)
      @trail = JSON.parse(trailuri.body)
      @lat = @trail["places"][0]["lat"]
      @lon = @trail["places"][0]["lon"]
      # searchuri = HTTParty.get "http://api.openweathermap.org/data/2.5/forecast/daily?lat=#{@lat}&lon=#{@lon}&units=imperial&cnt=5&mode=json"
      # @responses = JSON.parse(searchuri.body)
      # @name = @responses['city']['name']
      @instagram = Instagram.tag_recent_media("#{name}", {:count => 4})
      # @tweets = $client.search("##{name}" + " -rt", result_type: "recent").take(3)
    else
    end
  # we need to take lat and lon from show location and save as varialble named lat lon
  # we need to remove whitespace from trail name and save as a variable named name
  # weather endpoint
        # searchuri = HTTParty.get "http://api.openweathermap.org/data/2.5/forecast/daily?lat=#{@lat}&lon=#{@lon}&units=imperial&cnt=5&mode=json"
        # @responses = JSON.parse(searchuri.body)
 
  # tweet and instagram endpoints
      # @tweets = $client.search("##{name}" + " -rt", result_type: "recent").take(3)
      #  @instagram = Instagram.tag_recent_media("#{name}", {:count => 4})
  end

  private
  def endpoint
    endpoint = "https://outdoor-data-api.herokuapp.com/api.json?api_key=4146c148c3d63d322c2b88b4870a6ba1"
  end

  def about

  end

  def contact

  end

  def help
  
  end

end

