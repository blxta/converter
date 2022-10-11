
import os

def setArray():     
    mas = os.listdir(path="./parsers/")
    mas2 = []
    for m in mas:
        spl = m.split('.')
        for i in spl:
            if i == 'py':
                spl.remove(i)
        b = ''
        m = '.'.join(spl)
        b = b + '' + m
        if (b == '__init__' or b == '__pycache__' ) : continue
        else:
            mas2.append(b)
    
    return mas2

def getArray():
    return setArray()
