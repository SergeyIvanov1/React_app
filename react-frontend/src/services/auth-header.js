export default function authHeader() {
    // получить сохраненную информацию о пользователе (включая JWT)
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Если есть авторизованный пользователь user( accessTokenJWT), вернуть HTTP-заголовок авторизации. 
    // В противном случае вернуть пустой объект.
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }
