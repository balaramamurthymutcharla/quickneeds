import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

// --- Room Controllers ---

export const addRoom = asyncHandler(async (req, res) => {
  // TODO: Implement logic to add a new room to a family
  // 1. Get familyId from authenticated user (req.user)
  // 2. Get room_name, room_icon from req.body
  // 3. Create the room in the DB, associated with the family
  return res.status(201).json(new ApiResponse(201, {}, "Room created. Controller logic to be implemented."));
});

export const getRooms = asyncHandler(async (req, res) => {
  // TODO: Implement logic to get all rooms for a family
  return res.status(200).json(new ApiResponse(200, [], "Rooms fetched. Controller logic to be implemented."));
});

// --- Item Controllers ---

export const addItemToRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  // TODO: Implement logic to add an item to a room's list
  // 1. Get item_name from req.body
  // 2. Get added_by_user_id from req.user
  // 3. Create the item in the DB, associated with the roomId
  return res.status(201).json(new ApiResponse(201, { roomId }, "Item added. Controller logic to be implemented."));
});

export const getItemsInRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  // TODO: Implement logic to get all items in a room
  return res.status(200).json(new ApiResponse(200, { roomId, items: [] }, "Items fetched. Controller logic to be implemented."));
});

export const updateItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  // TODO: Implement logic to update an item's status or name
  return res.status(200).json(new ApiResponse(200, { itemId }, "Item updated. Controller logic to be implemented."));
});

