import React, { useReducer } from 'react';
import { createContext, useContext } from 'react';
import { MovieUseReducer, InitialValue } from '../MovieUseReducer/MovieUseReducer';

export const MovieContext = createContext(InitialValue);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieUseReducer, InitialValue);

  const getGenre = (e) => {
    dispatch({
      type: 'GET_GENRE',
      payload: e,
    });
  };
  const getCard = (e) => {
    dispatch({
      type: 'GET_CARD',
      payload: e,
    });
  };
  const getUserId = (e) => {
    dispatch({
      type: 'GET_USERID',
      payload: e,
    });
  };
  const getUpdate = (e) => {
    dispatch({
      type: 'GET_UPDATE',
      payload: e,
    });
  };

  const value = {
    theGenre: state.Genre,
    theCard: state.Card,
    theUserId: state.UserId,
    theUpdate: state.Update,
    getUpdate,
    getCard,
    getGenre,
    getUserId,
  };
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  return context;
};
