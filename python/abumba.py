from bs4 import BeautifulSoup
import requests
import os,sys
import subprocess
import glob
from os import path

cultures = {
    'wheat' : 'https://markets.businessinsider.com/commodities/wheat-price',
     'corn' : 'https://markets.businessinsider.com/commodities/corn-price',
}

with open('output_sublime.jsx', 'w') as f: #create file
    f.write("const element_" + cul + " = <div class=\"" + cul + "\">")
    f.close()    



for cul in cultures:
    page = requests.get(cultures[cul])
    soup = BeautifulSoup(page.text, "html.parser")
    allx = []
    ally = []
    allx = soup.findAll('div', class_="price-section__values")

    for data in allx:
        ally = data.find('span', class_="price-section__current-value") 
        with open('output_sublime.jsx', 'a') as f:
            f.write("const element_" + cul + " = <div class=\"" + cul + "\">")
            f.write(ally.get_text())
            f.write("</div>\n")
            f.close()