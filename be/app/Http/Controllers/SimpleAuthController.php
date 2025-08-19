<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SimpleAuthController extends Controller
{
    /**
     * Simple login tanpa database untuk testing
     */
    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Hardcoded admin credentials untuk testing
        $adminUsername = 'admin';
        $adminPassword = '123456';

        if ($request->username === $adminUsername && $request->password === $adminPassword) {
            // Generate simple token (untuk testing)
            $token = base64_encode($adminUsername . ':' . time() . ':' . bin2hex(random_bytes(16)));
            
            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => 1,
                    'username' => $adminUsername,
                    'name' => 'Administrator',
                    'email' => 'admin@example.com',
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Username atau password salah.'
        ], 401);
    }

    /**
     * Get profile - simple version
     */
    public function me(Request $request)
    {
        // Untuk testing, return user data yang sama
        return response()->json([
            'success' => true,
            'user' => [
                'id' => 1,
                'username' => 'admin',
                'name' => 'Administrator',
                'email' => 'admin@example.com',
            ]
        ]);
    }

    /**
     * Simple logout
     */
    public function logout(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out.'
        ]);
    }
}
