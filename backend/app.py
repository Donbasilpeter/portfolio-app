from flask import Flask
import requests


scrip_code = 500110
from_date = 20120301
to_date =  20130530
api_url = 'https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=' + str(scrip_code) + '&flag=1&fromdate=' +str(from_date) + '&todate=' +str(to_date) +  '&seriesid='

app = Flask(__name__)
app.debug = True

@app.route('/')
def getdata():
    response = requests.get(api_url, headers={'User-Agent' : ''})
    return response.content

if __name__ == '__main__':
    app.run(debug=True)
    