import { createSlice } from '@reduxjs/toolkit';
import { ErrorMessages, NameSpace } from '../../const';
import { DataRoom } from '../../types/state';
import { fetchRoomAction, fetchRoomReviewsAction, fetchRoomsNearbyAction } from '../api-actions';

const initialState: DataRoom = {
  room: null,
  roomReviews: [],
  roomsNearby: [],
  isDataLoading: false,
  notFoundError: false,
};

export const dataRoom = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setNotFoundStatus: (state, action) => {
      state.notFoundError = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRoomReviewsAction.fulfilled, (state, action) => {
        state.roomReviews = action.payload;
      })
      .addCase(fetchRoomsNearbyAction.fulfilled, (state, action) => {
        state.roomsNearby = action.payload;
      })
      .addCase(fetchRoomAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {
        state.room = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchRoomAction.rejected, (state, action) => {
        if (action.error.message === ErrorMessages.Code404) {
          state.notFoundError = true;
        }
        state.isDataLoading = false;
      });
  }
});

export const { setNotFoundStatus } = dataRoom.actions;
