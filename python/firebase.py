import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


# doc_ref = db.collection(u'users').document(u'alovelace')
# doc_ref.set({
#     u'first': u'Ada',
#     u'last': u'Lovelace',
#     u'born': 1815
# })


# users_ref = db.collection(u'marketWorld')
# docs = users_ref.stream()

# print(docs)

# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')
culture = "corn"


updd = db.collection('marketWorld').document(u'{}'.format(culture))
updd.update({u'price': 66666})