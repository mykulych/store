import accountSlice from './account.slice';
import { userService } from '../../services';
import { handleError } from '../errors/errors.actions';
import { createAction } from '@reduxjs/toolkit';

const { requested, received, failed, created, updated, accountRemoved, creationRequested, creationFailed } =
  accountSlice.actions;

const updateWishlistRequested = createAction('account/updateWishlistRequested');
const updateWishlistFailed = createAction('account/updateWishlistFailed');
const updateCartRequested = createAction('account/updateCartRequested');
const updateCartFailed = createAction('account/updateCartFailed');

const createAccount = (payload) => async (dispatch) => {
  dispatch(creationRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(creationFailed());
    dispatch(handleError(error));
  }
};

const loadAccountById = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await userService.getUserById(id);
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const removeAccountData = () => (dispatch) => {
  dispatch(accountRemoved());
};

const updateWishlist = (payload) => async (dispatch, getState) => {
  dispatch(updateWishlistRequested());
  const accountData = getState().account.entity;
  try {
    let newData;
    if (accountData.wishlist && accountData.wishlist.includes(payload)) {
      const filteredWishlist = accountData.wishlist.filter((x) => x !== payload);
      newData = {
        ...accountData,
        wishlist: filteredWishlist,
      };
    } else if (accountData.wishlist) {
      newData = {
        ...accountData,
        wishlist: [...accountData.wishlist, payload],
      };
    } else {
      newData = {
        ...accountData,
        wishlist: [payload],
      };
    }

    const { content } = await userService.update(newData);
    dispatch(updated(content));
  } catch (error) {
    dispatch(updateWishlistFailed());
    dispatch(handleError(error));
  }
};

const updateCart = (payload) => async (dispatch, getState) => {
  dispatch(updateCartRequested());
  const accountData = getState().account.entity;
  try {
    let newData;
    if (accountData.cart && accountData.cart.includes(payload)) {
      const filteredCart = accountData.cart.filter((x) => x !== payload);
      newData = {
        ...accountData,
        cart: filteredCart,
      };
    } else if (accountData.cart) {
      newData = {
        ...accountData,
        cart: [...accountData.cart, payload],
      };
    } else {
      newData = {
        ...accountData,
        cart: [payload],
      };
    }
    const { content } = await userService.update(newData);
    dispatch(updated(content));
  } catch (error) {
    dispatch(updateCartFailed());
    dispatch(handleError(error));
  }
};

export { createAccount, loadAccountById, removeAccountData, updateWishlist, updateCart };