<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/send-otp', [AuthController::class, 'otpSend']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/blogs', BlogController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('tags', TagController::class);
});

//__Public routes for Blogs
Route::get('/public/blogs', [BlogController::class, 'index']);
Route::get('/public/blogs/{blog}', [BlogController::class, 'show']);
//__Public routes for Categories
Route::get('/public/categories', [BlogController::class, 'index']);
Route::get('/public/categories/{id}', [BlogController::class, 'show']);
//__Public routes for Tags
Route::get('/public/tags', [BlogController::class, 'index']);
Route::get('/public/tags/{id}', [BlogController::class, 'show']);