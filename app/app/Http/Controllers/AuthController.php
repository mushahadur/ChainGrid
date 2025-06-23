<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\SendOtp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function setData(Request $request): JsonResponse
    {
        try {
            // Validate request data
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'username' => ['required', 'string', 'max:255', 'unique:users'],
                'referral_code' => ['nullable', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);

            // Generate OTP and token
            $otp = $this->generateOtp();

            // Prepare OTP session data
            $otpData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'username' => $validated['username'],
                'referral_code' => $validated['referral_code'] ?? null,
                'password' => Hash::make($validated['password']),
                'otp' => $otp,
                'created_at' => now()->toDateTimeString(),
            ];

            // Store in cache with 5-minute TTL
            Cache::put("cache_otp", $otpData, now()->addMinutes(50));

            // $check = Mail::to($validated['email'])->send(new SendOtp($otp));
            $check = true;
            if($check){
                return response()->json([
                    'success' => true,
                    'message' => 'OTP generated and sent successfully',
                    'debug' => config('app.debug') ? ['otp' => $otp] : null,
                ], 200);
            }else{
                return response()->json([
                    'success' => true,
                    'message' => 'OTP generated and sent successfully. Emal not send',
                    'debug' => config('app.debug') ? ['otp' => $otp] : null,
                ], 200);
            }
            // Dispatch OTP sending (email/SMS) - implementation depends on your setup
            // $this->dispatchOtp($validated['email'], $otp);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('OTP generation failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate OTP',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    private function dispatchOtp(string $email, int $otp): void
    {
        Mail::to($email)->send(new SendOtp($otp));
    }

    private function generateOtp(): int
    {
        return random_int(100000, 999999);
    }
    public function otpSend(Request $request): JsonResponse
    {
        try {
            // Validate request data
            $validated = $request->validate([
                'otp' => ['required', 'numeric', 'digits:6'],
            ]);

            // Retrieve OTP session data from cache
            $cacheKey = "cache_otp";
            $otpData = Cache::get($cacheKey);

            // Check if OTP session exists
            if (!$otpData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired token',
                ], 422);
            }

            // Verify OTP
            if ((int)$otpData['otp'] !== (int)$validated['otp']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid OTP',
                ], 422);
            }

            // Create new user
            $user = User::create([
                'name' => $otpData['name'],
                'email' => $otpData['email'],
                'username' => $otpData['username'],
                'referral_code' => $otpData['referral_code'],
                'password' => $otpData['password'],
                'email_verified_at' => now(),
            ]);

            // Clear OTP session from cache
            Cache::forget($cacheKey);

            // Generate authentication token (if using Sanctum or similar)
            // $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'username' => $user->username,
                ],
                // 'token' => $token, // Uncomment if using token-based auth
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('OTP verification failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to verify OTP',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'referral_code' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        // dd($validated['email']);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'referral_code' => $validated['referral_code'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if (!$user->is_admin) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}