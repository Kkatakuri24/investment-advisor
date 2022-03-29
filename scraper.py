import yfinance as yf
import json
import collections

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
        holders = ticker.get_major_holders
        hist = ticker.history(period="max")
        recom = ticker.recommendations
        analysis = ticker.analysis
        for column in recom[['To Grade']]:
            columnSeriesObj = recom[column]
            c = collections.Counter(columnSeriesObj.values)
            buy = c['Buy']
            sell = c['Sell']
            hold = c['Hold']

        dataDict = {}
        dataDict["lbs"] = info["longBusinessSummary"]
        dataDict["currentPrice"] = info["currentPrice"]
        dataDict["marketCap"] = info["marketCap"]
        dataDict["site"] = info["website"]
        dataDict["os"] = info["sharesOutstanding"]
        dataDict["floatS"] = info["floatShares"]
        dataDict["fftHigh"] = info["fiftyTwoWeekHigh"]
        dataDict["fftLow"] = info["fiftyTwoWeekLow"]
        dataDict["Buy"] = buy
        dataDict["Sell"] = sell
        dataDict["Hold"] = hold
        json_object = json.dumps(dataDict, indent=8)
        print(buy, sell, hold)
        return json_object