import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  query,
  where,
  arrayRemove,
} from "firebase/firestore";

const useGetCollection = (path, params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  function findUndefined(paramsOfFilter) {
    const arr = Object.keys(paramsOfFilter);
    for (let i = 1; i < arr.length; i++) {
      if (paramsOfFilter[arr[i]]) return "ok";
    }
    return "nok";
  }

  function isValidParams(paramsOfFilter) {
    let s = new Array(4);
    s.fill(undefined);
    let swap;
    if (paramsOfFilter.region) {
      swap = s.map((x) => where("region", "==", paramsOfFilter.region));
      s.splice(0);
      s = swap.slice(0);
      swap.splice(0);
    }
    if (paramsOfFilter.formOfPay) {
      if (s[0] !== undefined) {
        swap = s.map((x, index) => {
          if (index > 0) return where("form", "==", paramsOfFilter.formOfPay);
          else return x;
        });
      } else {
        swap = s.map((x) => where("form", "==", paramsOfFilter.formOfPay));
      }
      s.splice(0);
      s = swap.slice(0);
      swap.splice(0);
    }

    // s.forEach((i, index) => console.log(i));
    return s;
  }

  useEffect(() => {
    if (path != undefined && path != null && path != "") {
      let q = query(collection(db, path));

      if (params !== undefined && params.ok) {
        if (findUndefined(params) === "ok") {
          let a = isValidParams(params);

          console.log(a, "this a");
          q = query(collection(db, path), a[0], a[1], a[2], a[3]);
        }
      }

      // let p = a[0];

      //        // q = query(collection(db, path), a[0]);

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
