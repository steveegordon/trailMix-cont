module PagesHelper
  def trim_weather(weatherData)
    x = 0
    weather = []
    data = Hash.new
    while x < weatherData["cnt"]
      if weatherData["list"][x]["dt_txt"].include? "21:00:00"
      data["temp"] = weatherData["list"][x]["main"]["temp"]
      data["icon"] = weatherData["list"][x]["weather"][0]["icon"]
      data["date"] = weatherData["list"][x]["dt_txt"]
      weather.push(data)
      data = {}
      end
      x+=1
    end
    return weather
  end
end
