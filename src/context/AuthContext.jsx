import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext({
  user: Object,
  isAuthenticated: Boolean,
  login: () => {},
  logout: () => {},
});

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }

    case 'logout': {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }

    default:
      throw new Error(`Unknown action type in AuthContext ${action.type}`);
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const AuthContextProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext was used outside the AuthContextProvider');
  }
  return authContext;
};

export { useAuth, AuthContextProvider };
