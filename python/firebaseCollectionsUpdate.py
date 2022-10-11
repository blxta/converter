import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('keyForFirebaseConnection.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def update(id,price,culture):
    
    itemForUpdate = db.collection(f'marketWorld/{culture}/{culture}List').document(u'{}'.format(id))
    itemForUpdate.update({u'price': price})
    print('updated successfully')

def search(infoForUpdateDict):
    collection = db.collection(f'marketWorld/{infoForUpdateDict["culture"]}/{infoForUpdateDict["culture"]}List').stream()
    for i in collection:
        collectionItem = i.to_dict()
        if (infoForUpdateDict["index"] == collectionItem["indexMarket"] and infoForUpdateDict["market"] == collectionItem["marketRegion"]):
            update(i.id,infoForUpdateDict["price"],infoForUpdateDict["culture"])
