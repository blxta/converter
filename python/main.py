import importlib
# import inher.one as x
import os
import configForParsers.getParsersName as getParsersName
import firebaseCollectionsUpdate

listNamesParsers = getParsersName.getArray()

for name in listNamesParsers:
    module = importlib.import_module('parsers.'+ name)
    objParser = module.Parser()
    dict = objParser.findInJSON()
    for attr in dict:
        firebaseCollectionsUpdate.search(attr)
