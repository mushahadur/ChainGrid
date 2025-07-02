<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OtpController extends Controller
{
   
    public function otpSend(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'referral_code' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        
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

        if (session()->has('otp') && session()->has('email')) {
            $email = session('email');
            $otp = session('otp');
            return response()->json(['otp' => $email]);
            // Now use $email and $wallet as needed
            // return view('example', compact('email', 'wallet'));
        } else {
            return redirect()->back()->with('error', 'Session data not found!');
        }


        $check = Mail::to($validated['email'])->send(new SendOtp($otp));
        if ($check) {
            return response()->json([
                'message' => 'Send OTP successfully',
            ], 201);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }
}
