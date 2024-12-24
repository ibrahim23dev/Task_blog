<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    /**
     * Retrieve all user profiles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        return response()->json(UserProfile::all(), 200);
    }

    /**
     * Store a new user profile in the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
     public function store(Request $request)
    {
        // Validate the request input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:user_profiles,email', // Ensure correct table name
            'bio' => 'nullable|string',
        ]);

        // Create the user profile
        $userProfile = UserProfile::create($validated);

        // Return a JSON response with the newly created user profile
        return response()->json([
            'success' => true,
            'message' => 'User profile created successfully.',
            'data' => $userProfile,
        ], 201);
    }
}
