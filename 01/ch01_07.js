const fetchData = (callback) => {
  setTimeout(() => {
    const data = "서버에서 받은 데이터";
    callback(data);
  }, 1000);
};

const handleData = (data) => {
  console.log("콜백에서 받은 데이터", data);
};

fetchData(handleData());

const cb1 = callback(callback);

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};
fetchDataPromise().then((data) => {
  console.log("프로미스에서 받은 데이터", data);
});
