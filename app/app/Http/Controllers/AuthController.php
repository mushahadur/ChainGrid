<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\SendOtp;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function otpSend(Request $request)
    {
        
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'username' => 'required|string|max:255',
        //     'referral_code' => 'string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:8|confirmed',
        // ]);
        
        $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        // return response()->json(['otp' => $request->email]);

        session([
            'otp' => $otp,
            'name' => $request->email,
            'username' => $request->email,
            'referral_code' => $request->email,
            'email' => $request->email,
            'password' => Hash::make($request->email),
        ]);

        return response()->json(['mas' => "set session"]);
        
        // if (session()->has('otp') && session()->has('email')) {
        //     // Now use $email and $wallet as needed
        //     // return view('example', compact('email', 'wallet'));
        // } else {
        //     return redirect()->back()->with('error', 'Session data not found!');
        // }

    }
    public function register(Request $request)
    {
        if (session()->has('otp')) {
            $otp = session('otp');
            return response()->json(['otp' => $otp]);
        }
        else{
            return response()->json([
                'message' => 'Not find session OTP data',
            ], 404);
        }
        // dd("soem");

        $email = session('email');
        $otp = session('otp');
    
        if ($email && $otp) {
            return response()->json([
                'email' => $email,
                'otp' => $otp,
            ]);
        } else {
            return response()->json([
                'message' => 'Not find session data',
            ], 404); // use 404 or 422 instead of 201 for error
        }

         $request->validate([
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