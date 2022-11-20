import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";

const useGetCollection = (path, params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (path != undefined && path != null && path != "") {
      let q = query(collection(db, path));

      if (
        params !== {} &&
        params.region !== "" &&
        params.region !== undefined
      ) {
        q = query(collection(db, path), where("region", "==", params.region));
      }
      const unsubscribe = onSnapshot(q, (querySnap) => {
        let tempArray = [];
        querySnap.forEach((doc) => tempArray.push(doc.data()));
        setData(tempArray);
      });
      return () => unsubscribe();
    }
  }, [path, params]);
  return data;
};

export { useGetCollection };
