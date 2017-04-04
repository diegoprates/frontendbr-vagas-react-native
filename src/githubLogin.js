import base64 from 'base-64';

const config = {
    GITHUB_CLIENT_ID: 'e0b1671ff764de482212',
    GITHUB_CLIENT_SECRET: '8f77dcfd6a807cff38ac558400c859f240806071',
};

const AUTH_URL_PATH = 'https://api.github.com/authorizations';

export function login(name, pwd) {
      const bytes = name.trim() + ':' + pwd.trim();
      const encoded = base64.encode(bytes);

      return fetch(AUTH_URL_PATH, {
              method: 'POST',
              headers: {
                  'Authorization' : 'Basic ' + encoded,
                  'User-Agent': 'GitHub Issue Browser',
                  'Content-Type': 'application/json; charset=utf-8'
              },
              body: JSON.stringify({
                  'client_id': config.GITHUB_CLIENT_ID,
                  'client_secret': config.GITHUB_CLIENT_SECRET,
                  'scopes': ['user', 'repo'],
                  'note': 'not abuse'
              })
          })
          .then((response) => {
              const isValid = response.status < 400;
              const body = response._bodyInit;

              return response.json().then((json) => {
                  if (isValid) {
                      return json.token;
                  } else {
                      throw new Error(json.message);
                  }
              });
          });
}
