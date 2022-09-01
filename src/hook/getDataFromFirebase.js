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

  //  const [filter, setFilter] = useState({
  //    region: "Всі",
  //    priceMIN: 0,
  //    priceMAX: 0,
  //    formOfPay: 0,
  //  });

  console.log("путь", path);

  useEffect(() => {
    if (path != undefined && path != null && path != "") {
      const unsubscribe = onSnapshot(
        query(collection(db, path), where("region", "==", "Дніпровська")),

        (querySnap) => {
          let tempArray = [];
          querySnap.forEach((doc) => tempArray.push(doc.data()));
          setData(tempArray);
          console.log(tempArray, "temp");
        }
      );
      return () => unsubscribe();
    }
  }, [path]);

  return data;
};

export { useGetCollection };
