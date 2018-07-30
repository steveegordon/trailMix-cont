module PagesHelper
  def trim_weather(weatherData)
    x = 0
    while x < weatherData["cnt"]
      if weatherData["list"][x]["dt_txt"].include? "15:00:00"
      cleanWeather.push(weatherData["list"][x]["weather"][0]["icon"])
      cleanWeather.push(weatherData["list"][x]["dt_txt"])
      end
      x+=1
    end
    return cleanWeather
  end
end
