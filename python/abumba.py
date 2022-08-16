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

def parse(link,)
    
def tinitUpdate():

    fileSitesJson = open('sites.json')

    sitesObj = json.load(fileSitesJson)

    fileSitesJson.close()

    for arrayOfCultures in sitesObj:
        for culture in arrayOfCultures:
            for val in arrayOfCultures[culture]:

                
                #print(val["link"])
                page = requests.get(val["link"])
                soup = BeautifulSoup(page.text, "html.parser")
                mainDivs = []
                targetElements = []
                mainDivs = soup.findAll('div', class_="price-section__values")

                for data in mainDivs:
                    targetElements = data.find('span', class_="price-section__current-value") 
                    print(targetElements.get_text())
                    updatePricesMarketWorld(culture,targetElements.get_text())

    parse(val["link"],)                    


   

tinitUpdate()

