from bs4 import BeautifulSoup
import requests
import os,sys
import subprocess
import glob
from os import path
import cgitb
cgitb.enable()
 
import sys
import codecs
 
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())


cultures = {
    'wheat' : 'https://markets.businessinsider.com/commodities/wheat-price',
     'corn' : 'https://markets.businessinsider.com/commodities/corn-price',
}
 
path = 'C:\\Users\\blxta\\projects\\converter\\src\\components\\culturesArray.js'

with open(path, 'w') as f: #create file
    f.write('const culturesArray = [')
    f.close()    



for cul in cultures:
    page = requests.get(cultures[cul])
    soup = BeautifulSoup(page.text, "html.parser")
    allx = []
    ally = []
    allx = soup.findAll('div', class_="price-section__values")

    for data in allx:
        ally = data.find('span', class_="price-section__current-value") 
        with open(path, 'a') as f:
            f.write("[\"" + cul +"\"," + ally.get_text() + "],\n")
            f.close()

with open(path, 'a') as f: #end of file file
    f.write('] \n export {culturesArray};')
    f.close()    