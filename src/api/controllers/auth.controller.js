import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../../models/index.js';

const registerUser = asyncHandler(async (req, res) => {
  // TODO: Implement user registration logic
  // 1. Get user details from req.body
  // 2. Validate data
  // 3. Check if user already exists
  // 4. Create user in DB
  // 5. Return response
  return res.status(201).json(new ApiResponse(201, {}, "User registered successfully. Controller logic to be implemented."));
});

const loginUser = asyncHandler(async (req, res) => {
  // TODO: Implement user login logic
  // 1. Get email/password from req.body
  // 2. Find user in DB
  // 3. Check password
  // 4. Generate JWT
  // 5. Return token and user data
  return res.status(200).json(new ApiResponse(200, {}, "User logged in. Controller logic to be implemented."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully."));
});

export { registerUser, loginUser, getCurrentUser };
