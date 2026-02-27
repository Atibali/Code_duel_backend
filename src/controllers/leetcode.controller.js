const leetcodeService = require("../services/leetcode.service");
const { asyncHandler } = require("../middlewares/error.middleware");
const { sanitizeUsername } = require("../utils/sanitizer");

/**
 * Fetch user's LeetCode profile
 * GET /api/leetcode/profile/:username
 */
const getUserProfile = asyncHandler(async (req, res) => {
  // Sanitize username param
  const username = sanitizeUsername(req.params.username);
  
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Invalid username format",
    });
  }
  
  const profile = await leetcodeService.fetchUserProfile(username);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

/**
 * Test LeetCode connection (for debugging)
 * GET /api/leetcode/test/:username
 */
const testConnection = asyncHandler(async (req, res) => {
  // Sanitize username param
  const username = sanitizeUsername(req.params.username);
  
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Invalid username format",
    });
  }

  // Fetch recent submissions
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const submissions = await leetcodeService.fetchSubmissionsForDate(
    username,
    yesterday
  );

  res.status(200).json({
    success: true,
    message: "Connection test successful",
    data: {
      username,
      submissionsFound: submissions.length,
      submissions: submissions// Return first 5 for testing
    },
  });
});

/**
 * Fetch problem metadata (for admin/debugging)
 * GET /api/leetcode/problem/:titleSlug
 */
const getProblemMetadata = asyncHandler(async (req, res) => {
  // Sanitize titleSlug param - allow alphanumeric, hyphens, underscores
  const { sanitizeString } = require("../utils/sanitizer");
  const titleSlug = sanitizeString(req.params.titleSlug, { maxLength: 200 });
  
  if (!titleSlug || !/^[a-zA-Z0-9-_]+$/.test(titleSlug)) {
    return res.status(400).json({
      success: false,
      message: "Invalid problem title slug format",
    });
  }
  
  const metadata = await leetcodeService.fetchProblemMetadata(titleSlug);

  if (!metadata) {
    return res.status(404).json({
      success: false,
      message: `Problem not found: ${titleSlug}`,
    });
  }

  res.status(200).json({
    success: true,
    data: metadata,
  });
});

module.exports = {
  getUserProfile,
  testConnection,
  getProblemMetadata,
};
