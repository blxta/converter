import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";

const useGetCollection = (path) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (path != undefined && path != null && path != "") {
      const unsubscribe = onSnapshot(
        query(collection(db, path)),
        (querySnap) => {
          let tempArray = [];
          querySnap.forEach((doc) => tempArray.push(doc.data()));
          setData(tempArray);
        }
      );
      return () => unsubscribe();
    }
  }, [path]);

  return data;
};

export { useGetCollection };
