import { API_ADDRESS } from '../../constant/urls';

function delayPromise(startTime, waitTime, next, checkInterval = 100) {
  // 만약 에니메이션 시간이 지나지 않았으면 checkInterval 만큼 기다린 다음 다시 자긴을 수행.
  let nowTime = new Date().getTime();

  if (nowTime - startTime < waitTime) {
    setTimeout((e) => {
      delayPromise(startTime, waitTime, next, checkInterval);
    }, checkInterval);
  } else {
    next();
  }
}

export default {
  fetchPost: (
    path,
    params = {},
    timing = {
      delayTime: 0,
      startTime: 0,
      checkInterval: 100,
    }
  ) => {
    return new Promise((resolve, reject) => {
      fetch(`${API_ADDRESS}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(params),
      })
        .then((res) => {
          delayPromise(
            timing.startTime,
            timing.delayTime,
            () => {
              res.json().then((result) => {
                if (res.status === 200) {
                  resolve(result);
                } else {
                  reject(result.error);
                }
              });
            },
            timing.checkInterval
          );
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  fetchGet: (
    path,
    timing = {
      delayTime: 0,
      startTime: 0,
      checkInterval: 100,
    }
  ) => {
    return new Promise((resolve, reject) =>
      fetch(`${API_ADDRESS}${path}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          delayPromise(
            timing.startTime,
            timing.delayTime,
            () => {
              const result = res.json();
              if (res.status === 200) {
                resolve(result);
              }
              reject(result?.error);
            },
            timing.checkInterval
          );
        })
        .catch((error) => {
          reject(error.message);
        })
    );
  },
};
