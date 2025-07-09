<?php

use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/send-test-mail', function () {
//     Mail::raw('এটি একটি টেস্ট মেইল!', function ($message) {
//         $message->to('mushahadurrahamankhanpulock@gmail.com')
//                 ->subject('টেস্ট মেইল');
//     });

//     return 'মেইল পাঠানো হয়েছে!';
// });

