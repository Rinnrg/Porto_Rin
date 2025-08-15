
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Laravel Backend API is running!',
        'version' => app()->version()
    ]);
});
