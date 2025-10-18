const API_BASE = "http://localhost:3001"; // Change to your backend API base URL

// Fetch discussions
export const fetchDiscussions = async () => {
    const response = await fetch(`${API_BASE}/discussions/display`);
    return response.json();
};

// Post a discussion
export const postDiscussion = async (data) => {
    const response = await fetch(`${API_BASE}/discussions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Fetch comments for a discussion
export const fetchComments = async (discussionId) => {
    const response = await fetch(`${API_BASE}/comments/${discussionId}`);
    return response.json();
};

// Post a comment
export const postComment = async (data) => {
    const response = await fetch(`${API_BASE}/comments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Like a comment
export const likeComment = async (commentId) => {
    const response = await fetch(`${API_BASE}/comments/${commentId}/likes`, {
        method: "PATCH",
    });
    return response.json();
};

// Upvote a discussion
export const upvoteDiscussion = async (discussionId) => {
    const response = await fetch(`${API_BASE}/discussions/${discussionId}/upvotes`, {
        method: "PATCH",
    });
    return response.json();
};
