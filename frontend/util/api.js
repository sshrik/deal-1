export default {
  fetchPost: (path, params = {}) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then((res) => {
          const result = res.json();
          if (res.status === 200) {
            resolve(result);
          }
          return result;
        })
        .then((error) => {
          reject(error?.error);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  fetchGet: (path) => {
    return new Promise((resolve, reject) =>
      fetch(`http://localhost:3000${path}`)
        .then((res) => {
          const result = res.json();
          if (res.status === 200) {
            resolve(result);
          }
          return result;
        })
        .then((error) => {
          reject(error?.error);
        })
        .catch((error) => {
          reject(error.message);
        })
    );
  },
};
