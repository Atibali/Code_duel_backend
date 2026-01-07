const express = require("express");
const router = express.Router();
const leetcodeController = require("../controllers/leetcode.controller");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @route   POST /api/leetcode/session
 * @desc    Store LeetCode session for current user
 * @access  Private
 */
router.post(
  "/session",
  authenticate,
  leetcodeController.validateStoreSession,
  leetcodeController.storeSession
);

/**
 * @route   GET /api/leetcode/session
 * @desc    Get session status for current user
 * @access  Private
 */
router.get("/session", authenticate, leetcodeController.getSessionStatus);

/**
 * @route   DELETE /api/leetcode/session
 * @desc    Invalidate LeetCode session for current user
 * @access  Private
 */
router.delete("/session", authenticate, leetcodeController.invalidateSession);

/**
 * @route   GET /api/leetcode/profile/:username
 * @desc    Fetch user's LeetCode profile
 * @access  Private
 */
router.get(
  "/profile/:username",
  authenticate,
  leetcodeController.getUserProfile
);

/**
 * @route   GET /api/leetcode/test/:username
 * @desc    Test LeetCode connection
 * @access  Private
 */
router.get("/test/:username", authenticate, leetcodeController.testConnection);

/**
 * @route   GET /api/leetcode/problem/:titleSlug
 * @desc    Get problem metadata
 * @access  Private
 */
router.get(
  "/problem/:titleSlug",
  authenticate,
  leetcodeController.getProblemMetadata
);

module.exports = router;
