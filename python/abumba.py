from bs4 import BeautifulSoup
import requests
import os,sys
import subprocess
import glob
from os import path
import cgitb
cgitb.enable()
import json

import sys
import codecs
################################################

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore



 
cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

def updatePricesMarketWorld (culture,price):
   
    db = firestore.client()

    updd = db.collection('marketWorld').document(u'{}'.format(culture))
    updd.update({u'price': {price}})

    return 

    
def tinitUpdate():

    # cultures = {
    # 'wheat' : 'https://markets.businessinsider.com/commodities/wheat-price',
    #  'corn' : 'https://markets.businessinsider.com/commodities/corn-price',
    #             }

    fileSitesJson = open('sites.json')

    sitesObj = json.load(fileSitesJson)

    fileSitesJson.close()

    for obj in sitesObj:
        for keys in obj:
            print(keys)
            for val in obj[keys]:
                print(val["link"])
                page = requests.get(val["link"])
                soup = BeautifulSoup(page.text, "html.parser")
                allx = []
                ally = []
                allx = soup.findAll('div', class_="price-section__values")

                for data in allx:
                    ally = data.find('span', class_="price-section__current-value") 
                    print(ally.get_text())
                    updatePricesMarketWorld(keys,ally.get_text())




   

tinitUpdate()

