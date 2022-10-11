
from bs4 import BeautifulSoup
import requests
from os import path
import os
import cgitb


cgitb.enable()
import json

import sys
import codecs
import configForParsers.interface
######################################### #######

class Parser(configForParsers.interface.InitParser):

    def listForFindInJSON(self) :
        return {
        'index' : "BOBUZ",
        'culture': "wheat",
        'market': "USA",
        }

    def openFile(self):
        fileSitesJson = open('./configForParsers/listOfCulturesData.json')
        sitesList = json.load(fileSitesJson)
        fileSitesJson.close()
        return sitesList


    def getDataFromPage (self,linkForSearch):
        page = requests.get('{}'.format(linkForSearch))
        soup = BeautifulSoup(page.text, "html.parser")
        mainDivs = []
        targetElements = []
        mainDivs = soup.findAll('div', class_="price-section__values")
        for data in mainDivs:
            targetElements = data.find('span', class_="price-section__current-value") 
            return targetElements.get_text() 
            

    def findInJSON(self):
        arrayForUpdate = []
        sitesList = self.openFile()
        listForFind = self.listForFindInJSON()
        objCulture = sitesList.get(listForFind['culture'])
        if (objCulture):
            for objCultureItem in objCulture:
                if (objCultureItem['index'] == listForFind['index']):
                    priceOnSite = self.getDataFromPage(objCultureItem['link'])
                    arrayForUpdate.append({
                        'price' : priceOnSite, 
                        'index' : objCultureItem['index'],
                        'culture' : listForFind['culture'],
                        'market' : objCultureItem['market'],
                    })
        return arrayForUpdate
    
    
      