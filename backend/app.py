from flask import Flask,request
from flask_cors import CORS
import requests
import json
import datetime

#myapi ide for alphavantage SM1TGBEER868W5CT


app = Flask(__name__)
CORS(app)
app.debug = True




#get bse daily data using bse stock code and dates input formaat {  "script_code": "500222",  "from_date": "20130301",  "to_date": "20130530"}

@app.route('/data', methods = ['POST'])
def getdata():
    data = request.json
    script_code = data.get('script_code')
    from_date = data.get('from_date')
    to_date = data.get('to_date')
    api_url = 'https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=' + str(script_code) + '&flag=1&fromdate=' +str(from_date) + '&todate=' +str(to_date) +  '&seriesid='
    response = requests.get(api_url, headers={'User-Agent' : ''})
    responsedata = json.loads(response.content)
    name = responsedata["Scripname"]
    responsedata = responsedata["Data"]
    responsedata =json.loads(responsedata)
    start_date = datetime.date(int(from_date[0:4]), int(from_date[4:6]),int(from_date[6:8]))
    end_date = datetime.date(int(to_date[0:4]), int(to_date[4:6]),int(to_date[6:8]))
    delta = datetime.timedelta(days=1)
    i= 0
    length = len(responsedata)
    pricedate=[]
    while start_date <= end_date:
        
        datadate =datetime.datetime.strptime(responsedata[i]['dttm'][0:15], '%a %b %d %Y').strftime('%Y-%m-%d')
        if datadate == str(start_date):
            pricedate.append({"date": start_date, "price" : responsedata[i]['vale1'],"type" : True})   #use str(start_date) or startdate to chance format
            if i < length-1:
                i=i+1
        else:
            if i== 0:
                pricedate.append({"date": start_date, "price" :  responsedata[i]['vale1'] ,"type":False})
            else:
                pricedate.append({"date": start_date, "price" :  responsedata[i-1]['vale1'] ,"type":False})


        start_date += delta
    pricedate = {"script_code" : script_code, "name" : name, "pricedata" :pricedate}
    return pricedate


@app.route('/getcode', methods = ['GET'])
def getcode():
    f = open('data.json',)
    bsecode = json.load(f)
    response = { "data" : bsecode}
    return response



if __name__ == '__main__':
    app.run(debug=True)
    