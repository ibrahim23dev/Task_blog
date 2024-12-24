<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserProfileController;

// Default route
Route::get('/', function () {
    return view('welcome');
});



// // Fetch all user profiles
// Route::get('/users', [UserProfileController::class, 'create']);

// // Store a new user profile
// Route::get('/user', [UserProfileController::class, 'store']);
