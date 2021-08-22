import yfinance as yf
import json

# ticker = yf.Ticker("GME")
# info = ticker.info
# info = str(info)
# print(info)

# longBusinessSumarry
# currentPrice
# website
# sharesOutstanding
# floatShares
# fiftyTwoWeekHigh
# fiftyTwoWeekLow
# marketCap


class scraper:
    def __init__(self):
        self.data = []

    def search(self, tickerName):
        ticker = yf.Ticker(tickerName)
        info = ticker.info
        dataDict = {}
        dataDict["lbs"] = info["longBusinessSummary"]
        dataDict["currentPrice"] = info["currentPrice"]
        dataDict["marketCap"] = info["marketCap"]
        dataDict["site"] = info["website"]
        dataDict["os"] = info["sharesOutstanding"]
        dataDict["floatS"] = info["floatShares"]
        dataDict["fftHigh"] = info["fiftyTwoWeekHigh"]
        dataDict["fftLow"] = info["fiftyTwoWeekLow"]
        json_object = json.dumps(dataDict, indent=8)
        return json_object